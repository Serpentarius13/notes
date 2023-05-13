import { baseUrl } from "@/features/constants/baseUrl";
import { IGPTResponse } from "@/features/types/gpt";

async function getGptResponse(message: string): Promise<IGPTResponse | null> {
  const response = await fetch(`${baseUrl}/api/gpt`, {
    body: JSON.stringify({ message }),
    method: "POST",
  });

  if (response.ok) {
    return await response.json();
  } else return null;
}

export const revalidate = 0;

export default async function Home() {
  return <></>;
}
