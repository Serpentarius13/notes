import LoadingSpinner from "./Shared/LoadingSpinner";

export default function Loading() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner size={96} />
    </main>
  );
}
