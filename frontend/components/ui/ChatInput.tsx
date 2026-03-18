"use client";

import { Paperclip, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";

export default function ChatInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage, isLoading, uploadDocument } = useChat();
  const [input, setInput] = useState("");

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        uploadDocument(file);
      });
      e.target.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="flex-1 flex px-4 gap-3 bg-card rounded-xl border border-border items-center py-2.5 shadow-lg shadow-black/10 hover:border-primary/20 focus-within:border-primary/40 focus-within:shadow-glow-primary transition-all duration-300"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.txt,.md,.doc,.docx"
              multiple
            />

            <button 
              onClick={handleAttachClick}
              type="button"
              className="text-muted-foreground hover:text-sidebar-foreground transition-colors duration-200 p-1 rounded-md hover:bg-secondary disabled:opacity-50"
              title="Attach Document"
              disabled={isLoading}
            >
              <Paperclip className="w-[18px] h-[18px]" />
            </button>
            
            <input
              type="text"
              placeholder="Ask about your documentation..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white p-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm shadow-glow-primary hover:shadow-glow-primary-strong active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:pointer-events-none"
              title="Send Message"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
      </div>
    </div>
  );
}
