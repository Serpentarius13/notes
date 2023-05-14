import { makeBadRequestError } from "@/features/utils/serverError";

export async function DELETE(
  request: Request,
  { params: { documentId } }: { params: { documentId: string } }
) {
  try {
    await prisma?.document.delete({ where: { id: documentId } });


    return new Response("ok");
  } catch (error) {
    console.log(error);
    return makeBadRequestError("Error deleting note");
  }
}
