"use client";

import DocUpload from "../components/ui/DocUpload";
import ChatInput from "../components/ui/ChatInput";
import Chat from "../components/ui/Chat";
import { useChat } from "../context/ChatContext";

export default function Home() {
  const { documents } = useChat();

  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
      {documents.length === 0 ? <DocUpload /> : <Chat />}
      
      <div className="w-full shrink-0">
        <ChatInput />
      </div>
    </div>
  );
}
