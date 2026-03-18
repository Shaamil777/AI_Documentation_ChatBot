"use client";

import { FileText, MessageSquare, Upload } from "lucide-react";
import UploadButton from "./UploadButton";
import { useChat } from "../../context/ChatContext";

export default function DocUpload() {
  const { uploadDocument } = useChat();

  const handleUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      uploadDocument(file);
    });
  };

  return (
    <div className="flex-1 flex items-center justify-center px-8">
      <div className="max-w-lg text-center space-y-8 animate-fade-in-up">
        <div className="flex justify-center gap-4">
          <div
            className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center border border-border hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 cursor-default animate-float"
            style={{ animationDelay: "0s" }}
          >
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div
            className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center border border-border hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 cursor-default animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div
            className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center border border-border hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 cursor-default animate-float"
            style={{ animationDelay: "1s" }}
          >
            <Upload className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-foreground text-xl font-semibold tracking-tight">
            Upload documentation to start chatting
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            Upload PDF, Markdown, or Text files and ask questions about them.
            <br />
            <span className="opacity-75">
              AI will answer based only on your uploaded content.
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <UploadButton label="Upload Documents" variant="glow" onUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
}
