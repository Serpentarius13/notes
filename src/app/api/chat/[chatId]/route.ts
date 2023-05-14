import { deleteChat } from "@/features/api/chat";
import { makeBadRequestError } from "@/features/utils/serverError";

export async function DELETE(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  const { chatId } = params;

  try {
    await deleteChat(chatId);

    return new Response("Ok");
  } catch (error) {
    return makeBadRequestError("Error deleting chat");
  }
}
