"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";

interface UploadButtonProps {
  label?: string;
  variant?: "default" | "glow";
  className?: string;
  onUpload?: (files: FileList) => void;
}

export default function UploadButton({
  label = "Upload Document",
  variant = "default",
  className = "",
  onUpload,
}: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseStyles =
    "bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 active:scale-[0.97]";

  const variantStyles =
    variant === "glow"
      ? "py-2.5 px-7 shadow-md shadow-glow-primary hover:shadow-lg hover:shadow-glow-primary-strong animate-pulse-glow justify-center"
      : "py-2.5 px-4 shadow-md shadow-glow-primary hover:shadow-lg hover:shadow-glow-primary-strong justify-center w-full text-sm";

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onUpload) {
        onUpload(e.target.files);
      }
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.txt,.md,.doc,.docx"
        multiple
      />
      <button
        className={`${baseStyles} ${variantStyles} ${className}`}
        onClick={handleButtonClick}
      >
        <Upload className="w-4 h-4" />
        {label}
      </button>
    </>
  );
}
