import { Message } from "@prisma/client";
import Image from "next/image";

export default function ChatMessage({
  messages,
  message,
  avatar,
}: {
  messages: Message[];
  message: Message;
  avatar: string;
}) {
  let isLast: boolean = false;

  const { mine, text } = message;

  const lastMessage = messages.findLast((m) => m.mine === mine);

  if (lastMessage && message.id === lastMessage.id) {
    isLast = true;
  }

  return (
    <div className={`flex items-end gap-[1rem] ${mine && "self-end"}`}>
      {!mine && isLast && (
        <Image
          src="/img/chat-gpt.svg"
          alt="Chat gpt image"
          width={48}
          height={48}
          className="rounded-big"
        />
      )}

      <p className="flex max-w-[30rem] items-end  gap-[1rem] break-words rounded-small border-[1px] border-solid border-black bg-white p-[1rem] text-[1.6rem] text-black dark:border-white dark:bg-slate-700 dark:text-white ">
        {text}
      </p>

      {mine && isLast && (
        <Image
          src={avatar}
          alt="Your avatar"
          width={48}
          height={48}
          className="rounded-big"
        />
      )}
    </div>
  );
}
