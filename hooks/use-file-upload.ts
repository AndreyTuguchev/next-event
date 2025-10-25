import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

export function useFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const uploadFiles = async (
    filesToUpload: File[],
    fallbackUrl: string
  ): Promise<string> => {
    if (filesToUpload.length === 0) {
      return fallbackUrl;
    }

    const uploadedImages = await startUpload(filesToUpload);

    if (!uploadedImages || uploadedImages.length === 0) {
      throw new Error("File upload failed");
    }

    return uploadedImages[0].url;
  };

  return {
    files,
    setFiles,
    uploadFiles,
    isUploading,
  };
}
