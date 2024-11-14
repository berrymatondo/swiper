import { File } from "buffer";
import React, { useState } from "react";
import { promises as fs } from "fs";
import Link from "next/link";

const Upload = () => {
  // const [file, setFile] = useState<any>();

  const action = async (formData: FormData) => {
    "use server";
    // console.log("file", formData);

    const file: File | null = formData.get("file") as unknown as File;

    if (!file || file?.size === 0) {
      return { error: "No file uploaded" };
    }

    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    await fs.writeFile(`${process.cwd()}/tmp/${file.name}`, buffer);
  };

  return (
    <div className="flex flex-col justify-center py-24">
      <form action={action}>
        <input
          type="file"
          name="file"
          /*           onChange={(e) => setFile(e.target.files?.[0])}
           */
        />
        <button type="submit" value="Upload">
          Sumbit
        </button>
      </form>

      <Link target="_blank" href="./tmp/14-11-2024.pdf">
        Download
      </Link>
    </div>
  );
};

export default Upload;
