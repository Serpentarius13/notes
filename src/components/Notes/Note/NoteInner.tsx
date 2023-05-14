interface INoteInner {
  title: null | string;
  text: string;
  isFullSize?: boolean;
}

export default function NoteInner({
  title,
  text,
  isFullSize = false,
}: INoteInner) {
  return (
    <div className="flex flex-col gap-[1.4rem] ">
      <h4 className="text-[3rem] font-bold break-words">{title ? title : "No title"}</h4>

      <p
        className={`${
          isFullSize ? "" : " note-text h-[4.5rem]"
        }  max-w-full  break-words text-[1.6rem]`}
      >
        {text}
      </p>
    </div>
  );
}
