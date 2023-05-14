import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "px-[2rem] py-[1.5rem] text-[1.6rem] border-solid border-[1px] border-transparent rounded-medium focus:outline-none focus:ring-1 focus:ring-blue-800 focus:ring-solid flex items-center justify-center transition-all",

  {
    variants: {
      variant: {
        default:
          "bg-black text-white !border-black hover:bg-white hover:text-black dark:!border-white",
        outline:
          "bg-white text-black !border-black hover:bg-black hover:text-white dark:!border-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  variant,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {" "}
      {children}{" "}
    </button>
  );
}
