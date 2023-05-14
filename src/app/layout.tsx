import Sidebar from "@/components/Sidebar/Sidebar";
import "../../assets/main.scss";
import { Roboto_Slab } from "next/font/google";

import ClientProviders from "@/components/ClientProviders";

const RobotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata = {
  title: "Notely",
  description:
    "Notely - Write, save and edit your notes to later discuss them with OpenAi's ChatGPT!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${RobotoSlab.className} flex `}>
        <ClientProviders>
          {/* @ts-expect-error Server Component */}
          <Sidebar />

          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
