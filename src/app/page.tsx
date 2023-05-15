

import Notes from "@/components/Notes/Notes";

export const revalidate = 0;

export default async function Home() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Notes />
    </>
  );
}
