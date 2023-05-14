type TInputType = "password" | "text" | "textarea";

interface ITextInput {
  placeholder: string;
  handleChange: (event: any) => void;
  type?: TInputType;
  initialValue?: string;
  value?: string
}

export default function TextInput({
  placeholder,
  handleChange,
  type = "text",
  initialValue = "",
  value
}: ITextInput) {
  const styleClass =
    "w-full p-[1rem] bg-white border-[1px] border-solid border-black rounded-big !text-black focus:outline-none focus:ring-1 focus:ring-solid focus:ring-black text-[1.8rem]  ";
  return (
    <>
      {type === "textarea" ? (
        <textarea
          className={`${styleClass} min-h-[40rem] resize-none`}
          onChange={handleChange}
          placeholder={placeholder}
          defaultValue={initialValue}
          value={value}
        ></textarea>
      ) : (
        <input
          type={type}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${styleClass}`}
          defaultValue={initialValue}
          value={value}
        />
      )}
    </>
  );
}
