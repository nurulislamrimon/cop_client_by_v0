import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
  className?: string;
  label?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  className,
  label,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
    onFileSelect?.(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onFileSelect?.(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/40 bg-background px-6 py-10 text-center transition hover:border-primary hover:bg-accent/50"
      >
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Click to upload or drag & drop
        </p>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        {file && (
          <div className="absolute right-3 top-3 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="rounded-full bg-destructive p-1 text-white hover:bg-destructive/80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 max-h-40 rounded-md object-contain"
          />
        )}
      </div>
    </div>
  );
};
