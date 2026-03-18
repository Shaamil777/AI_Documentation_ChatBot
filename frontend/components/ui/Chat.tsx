"use client";

import { useChat } from "../../context/ChatContext";
import { User, FileText, Loader2 } from "lucide-react";

export default function Chat() {
  const { messages, isLoading } = useChat();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
      <div className="max-w-4xl mx-auto space-y-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center ${
                msg.role === "user" ? "bg-primary text-white" : "bg-card border border-border text-primary shadow-sm shadow-glow-primary"
              }`}
            >
              {msg.role === "user" ? (
                <User className="w-5 h-5" />
              ) : (
                <FileText className="w-4 h-4" />
              )}
            </div>

            <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
              <div
                className={`px-5 py-3.5 rounded-2xl text-[14.5px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm shadow-sm"
                    : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
                }`}
              >
                {msg.content}
              </div>

              <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground ml-1 mr-1">
                <span>{msg.timestamp}</span>
              </div>

              {msg.role === "ai" && msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 w-full bg-source bg-opacity-50 border border-source rounded-xl p-3 shadow-inner">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sources</p>
                  <div className="space-y-1.5">
                    {msg.sources.map((src, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-card border border-border px-3 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-primary opacity-80" />
                          <span className="text-xs text-foreground font-medium truncate max-w-[200px]" title={src.split(" - ")[0]}>
                            {src.split(" - ")[0]}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground opacity-80 bg-background px-1.5 py-0.5 rounded border border-border">
                          {src.split(" - ")[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-card border border-border text-primary rounded flex-shrink-0 flex items-center justify-center shadow-sm shadow-glow-primary">
              <FileText className="w-4 h-4" />
            </div>
            <div className="bg-card border border-border px-5 py-3.5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-[14.5px] text-muted-foreground">Thinking...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
