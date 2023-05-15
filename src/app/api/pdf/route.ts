import { NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist";

interface ITextContent {
  items: { str: string }[];
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    const buffer = await file.arrayBuffer();
    pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker";

    const task = pdfjs.getDocument(buffer);

    const pdf = await task.promise;

    const { numPages } = pdf;

    let textContent = "";

    await Promise.all(
      Array({ length: numPages }).map(async (el, ix) => {
        const page = await pdf.getPage(ix + 1);

        const text = (await page.getTextContent()) as ITextContent;

        text.items.forEach((item) => (textContent += `${item.str} \n`));
      })
    );

    return NextResponse.json(textContent);
  } catch (error) {
    console.log(error);
  }
}
