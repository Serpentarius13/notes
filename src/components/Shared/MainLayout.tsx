export default function MainLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-full max-h-screen w-full flex-col gap-[2rem] overflow-y-auto overflow-x-hidden px-[4rem] py-[2rem]">
      <h1 className="text-[4rem] font-bold">{title}</h1>
      {children}
    </main>
  );
}
