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

    const messageForGpt = await decideContext(
      context as ChatContext,
      session,
      messages,
      message
    );

    console.log(messageForGpt);

    const { data }: { data: IGPTResponse } = await gptInstance.post(
      "/chat/completions",
      {
        model: GPTModels.gpt,
        messages: [{ role: GPTRoles.assistant, content: messageForGpt }],
      }
    );

    const response = data.choices[0].message.content;

    const myMessage = await addChatMessage(true, id, message);
    const gptMessage = await addChatMessage(false, id, response);

    return NextResponse.json({ response: gptMessage, myMessage: myMessage });
  } catch (error: any) {
    console.log(error?.response.data);
    return makeBadRequestError("Error sending message");
  }
}
