import { makeLocaleDate } from "@/features/utils/makeLocaleDate";
import { Note } from "@prisma/client";

export default function DocumentDate({ date }: { date: Date }) {
  return (
    <span className="text-[1.2rem] text-gray-400">{makeLocaleDate(date)}</span>
  );
}
