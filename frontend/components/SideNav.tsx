"use client";

import { FileText, Trash2, Settings, ChevronDown, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import UploadButton from "./ui/UploadButton";
import { useChat } from "../context/ChatContext";

export default function SideNav() {
  const { documents, uploadDocument, clearChat, clearDocuments } = useChat();

  const handleUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      uploadDocument(file);
    });
  };

  return (
    <aside className="w-[280px] min-w-[280px] bg-sidebar-bg h-full flex flex-col border-r border-border">
      <div className="p-4 pb-3">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-glow-primary">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-foreground font-semibold text-[15px] tracking-tight">
            DocChat AI
          </span>
        </div>

        <UploadButton onUpload={handleUpload} />
      </div>

      <div className="flex-1 px-4 py-2 overflow-y-auto">
        <button className="flex items-center gap-1.5 text-muted-foreground text-[11px] uppercase tracking-widest font-medium mb-3 hover:text-sidebar-foreground transition-colors duration-200 w-full">
          <ChevronDown className="w-3 h-3" />
          Documents ({documents.length})
        </button>

        {documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 opacity-50">
            <FileText className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground text-xs text-center leading-relaxed">
              No documents yet.
              <br />
              Upload to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-1 mt-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-secondary transition-colors duration-200 group"
              >
                <div className="mt-0.5">
                  <FileText className="w-4 h-4 text-primary opacity-80" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-[13px] font-medium text-foreground truncate" title={doc.name}>
                    {doc.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {doc.status === "processing" ? (
                      <span className="flex items-center gap-1 text-accent">
                        <Loader2 className="w-3 h-3 animate-spin" /> Processing...
                      </span>
                    ) : doc.status === "error" ? (
                      <span className="flex items-center gap-1 text-destructive">
                        <AlertCircle className="w-3 h-3" /> Failed
                      </span>
                    ) : (
                      <span className="opacity-75">
                        {doc.chunks} chunks • {doc.date}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-border space-y-0.5">
        <button 
          onClick={clearChat}
          className="w-full flex items-center gap-2.5 text-muted-foreground hover:text-sidebar-foreground hover:bg-secondary py-2 px-3 rounded-lg text-[13px] transition-all duration-200 group"
        >
          <Trash2 className="w-4 h-4 group-hover:text-destructive transition-colors duration-200" />
          Clear Chat
        </button>
        <button 
          onClick={clearDocuments}
          className="w-full flex items-center gap-2.5 text-muted-foreground hover:text-sidebar-foreground hover:bg-secondary py-2 px-3 rounded-lg text-[13px] transition-all duration-200 group"
        >
          <Trash2 className="w-4 h-4 group-hover:text-destructive transition-colors duration-200" />
          Clear Documents
        </button>
        <button className="w-full flex items-center gap-2.5 text-muted-foreground hover:text-sidebar-foreground hover:bg-secondary py-2 px-3 rounded-lg text-[13px] transition-all duration-200">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}