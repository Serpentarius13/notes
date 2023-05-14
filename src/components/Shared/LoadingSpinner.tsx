import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSpinner({ size }: { size: number }) {
  return <AiOutlineLoading3Quarters className="rotated " size={size} />;
}
