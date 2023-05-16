"use client";

import Button from "@/components/Shared/Buttons/Button";
import LoadingButton from "@/components/Shared/Buttons/LoadingButton";
import FileInput from "@/components/Shared/Input/FileInput";
import TextInput from "@/components/Shared/Input/TextInput";
import { serverFetcher } from "@/features/api/serverFetcher";
import { useField } from "@/features/hooks/useField";
import { toaster } from "@/features/lib/toaster";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const DocumentForm = ({ handleClose }: { handleClose: () => void }) => {
  const [file, setFile] = useState<File | string>("/pdf.pdf");
  const [isLoading, setLoading] = useState<boolean>(false);

  const [isFileLoading, setFileLoading] = useState<boolean>(false);

  const router = useRouter();

  const [fileText, setFileText] = useState<string | null>(null);

  const { value: title, handleChange } = useField<string>("");

  async function handleFile(file: File) {
    try {
      setFileLoading(true);
      if (file.name.split(".").at(-1) === "pdf") {
        const formData = new FormData();

        formData.append("file", file);

        const { data } = await axios.postForm<{ text: string }>(
          `${process.env.NEXT_PUBLIC_PDF_API}/pdf`,
          formData
        );

        setFileText(data.text);

      } else {
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = (event) => setFileText(event!.target!.result as string);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toaster.error(error.message);
      } else {
        toaster.error("Error uploading file");
      }
    } finally {
      setFileLoading(false);
    }
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
        accept=".txt, .doc, .docx, .pdf"
        isLoading={isFileLoading}
      />

      <p className="max-w-full break-words text-[1.3rem]">
        {fileText?.trim() === "" ? "Empty file" : fileText}
      </p>

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
