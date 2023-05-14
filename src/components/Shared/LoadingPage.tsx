import LoadingSpinner from "./LoadingSpinner";

export default function LoadingPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner size={96} />
    </main>
  );
}
