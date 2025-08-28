"use client";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

export interface FileItem {
  source?: string;
  file?: File;
}

interface FileInputProps {
  label: string;
  files: FileItem[];
  onFilesChange: (files: FileItem[]) => void;
  description?: string;
}

export default function FileInput({
  label,
  files,
  onFilesChange,
  description,
}: FileInputProps) {
  const pondFiles = files
    .filter((file) => file.source)
    .map((file) => file.source as string);

  const handleFilesChange = (newFiles: any[]) => {
    const convertedFiles = newFiles.map((file) => ({
      source: file.source,
      file: file.file,
    }));
    onFilesChange(convertedFiles);
  };

  const FilePondComponent = FilePond as any;

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-default-700">{label}</label>
      <FilePondComponent
        files={pondFiles}
        onupdatefiles={handleFilesChange}
        allowMultiple={false}
        acceptedFileTypes={["image/*"]}
        labelIdle="📁 Görseli sürükleyin veya seçin"
        labelFileProcessing="⏳ Yükleniyor..."
        labelFileProcessingComplete="✅ Yüklendi"
        labelFileProcessingAborted="❌ Yükleme iptal edildi"
        labelFileProcessingError="⚠️ Yükleme hatası"
        labelTapToCancel="🔄 İptal etmek için tıklayın"
        labelTapToRetry="🔄 Tekrar denemek için tıklayın"
        labelTapToUndo="↩️ Geri almak için tıklayın"
        labelFileTypeNotAllowed="❌ Bu dosya türü desteklenmiyor"
        fileValidateTypeLabelExpectedTypes="📸 Desteklenen formatlar: {allTypes}"
        fileValidateTypeLabelExpectedTypesMap={{
          "image/*": "Resim dosyaları (JPG, PNG, GIF)",
        }}
        stylePanelLayout="compact"
        styleLoadIndicatorPosition="center bottom"
        styleProgressIndicatorPosition="right bottom"
        styleButtonRemoveItemPosition="left bottom"
        styleButtonProcessItemPosition="right bottom"
        credits={false}
      />
      <p className="text-xs text-default-400">
        {description || "Önerilen boyut: 400x400px, maksimum dosya boyutu: 5MB"}
      </p>
    </div>
  );
}
