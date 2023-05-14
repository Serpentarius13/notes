import { getChat } from "@/features/api/chat";
import { gptInstance } from "@/features/api/gptInstance";
import { addChatMessage } from "@/features/api/message";
import decideContext, {
  makePreviousMessages,
} from "@/features/lib/chat/context";
import {
  ChatContext,
  GPTModels,
  GPTRoles,
  IGPTResponse,
} from "@/features/types/gpt";
import { getOwnSession } from "@/features/utils/getSession";
import {
  makeBadRequestError,
  makeConflictError,
  makeNotEnoughDataError,
} from "@/features/utils/serverError";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message, chatId } = await request.json();

    if (!message) return makeNotEnoughDataError("No message was provided");

    if (!chatId) return makeNotEnoughDataError("No chat room was provided");

    const session = await getOwnSession();

    const chat = await getChat(chatId);

    if (!chat) return makeConflictError("No chat was found");

    const { context, messages, id } = chat;

    await addChatMessage(true, id, message);

    let additionalMessage: string;

    if (!messages.length) {
      additionalMessage = await decideContext(context as ChatContext, session);
    } else {
      additionalMessage = makePreviousMessages(messages);
    }

    const { data }: { data: IGPTResponse } = await gptInstance.post(
      "/chat/completions",
      {
        model: GPTModels.gpt,
        messages: [
          { role: GPTRoles.admin, content: additionalMessage },
          {
            role: GPTRoles.user,
            content: message,
          },
        ],
      }
    );

    const response = data.choices[0].message.content;

    await addChatMessage(false, id, response);

    return NextResponse.json(data.choices[0].message.content);
  } catch (error) {
    return makeBadRequestError("Error sending message");
  }
}
