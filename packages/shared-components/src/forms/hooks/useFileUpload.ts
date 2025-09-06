import { useState } from "react";
import { FileItem } from "@/forms/fields/FileInput";

export function useFileUpload(initialImageUrl?: string | null) {
  const [files, setFiles] = useState<FileItem[]>(() => {
    if (initialImageUrl) {
      return [{ source: initialImageUrl }];
    }
    return [];
  });

  const preparePayload = (data: any) => {
    const payload: any = { ...data };

    if (files.length > 0) {
      const fileItem = files[0];

      if (fileItem.file && fileItem.file instanceof File) {
        payload.file = fileItem.file;
        payload.image_url = undefined;
      } else if (fileItem.source) {
        payload.image_url = fileItem.source;
        payload.file = undefined;
      }
    } else {
      payload.image_url = null;
      payload.file = undefined;
    }

    return payload;
  };

  const resetFiles = () => {
    setFiles([]);
  };

  return {
    files,
    setFiles,
    preparePayload,
    resetFiles,
  };
}
