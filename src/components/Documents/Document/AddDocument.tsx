import Button from "@/components/Shared/Buttons/Button";
import LoadingButton from "@/components/Shared/Buttons/LoadingButton";
import FileInput from "@/components/Shared/Input/FileInput";
import TextInput from "@/components/Shared/Input/TextInput";
import { serverFetcher } from "@/features/api/serverFetcher";
import { useField } from "@/features/hooks/useField";
import { toaster } from "@/features/lib/toaster";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const DocumentForm = ({ handleClose }: { handleClose: () => void }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const [fileText, setFileText] = useState<string>("");

  const { value: title, handleChange } = useField<string>("");

  function handleFile(file: File) {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (event) => setFileText(event!.target!.result as string);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      setLoading(true);

      await serverFetcher.post("/api/documents", { text: fileText, title });

      toaster.success("Document succesfully created!");

      handleClose();

      router.refresh();
    } catch (error) {
      toaster.error("Error creating document!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-[1.4rem] "
    >
      <TextInput handleChange={handleChange} placeholder="Document's title" />
      <FileInput
        handleChange={handleFile}
        placeholder="Drop your document here"
      />

      <p className="max-w-full break-words text-[1.3rem]">{fileText}</p>

      <LoadingButton loading={isLoading}> Send document </LoadingButton>

      <Button variant="default" type="button" onClick={handleClose}>
        {" "}
        Close{" "}
      </Button>
    </form>
  );
};

export default function AddDocument() {
  const [isCreating, setCreating] = useState<boolean>(false);

  return (
    <>
      {isCreating ? (
        <DocumentForm handleClose={() => setCreating(false)} />
      ) : (
        <button className="add-btn" onClick={() => setCreating(true)}>
          {" "}
          <span> +</span>
        </button>
      )}
    </>
  );
}
