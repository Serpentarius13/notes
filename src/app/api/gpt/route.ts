import { gptInstance } from "@/features/api/gptInstance";
import { GPTModels, GPTRoles, IGPTResponse } from "@/features/types/gpt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!message) return new Response("No message was provided", { status: 409 });
  const { data }: { data: IGPTResponse } = await gptInstance.post(
    "/chat/completions",
    {
      model: GPTModels.gpt,
      messages: [
        {
          role: GPTRoles.user,
          content: message,
        },
      ],
    }
  );

  console.log(data);
  return NextResponse.json(data);
}
