"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface Document {
  id: string;
  name: string;
  status: "processing" | "ready" | "error";
  chunks?: number;
  date: string;
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  sources?: string[];
}

interface ChatContextType {
  documents: Document[];
  messages: Message[];
  uploadDocument: (file: File) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  clearDocuments: () => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedDocuments = localStorage.getItem("docchat_documents");
    if (savedDocuments) {
      try {
        const parsedDocs = JSON.parse(savedDocuments);
        setDocuments(parsedDocs);
      } catch (error) {
        console.error("Failed to parse saved documents:", error);
        localStorage.removeItem("docchat_documents");
      }
    }
  }, []);

  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem("docchat_documents", JSON.stringify(documents));
    } else {
      localStorage.removeItem("docchat_documents");
    }
  }, [documents]);

  const uploadDocument = async (file: File) => {
    const newDocId = crypto.randomUUID();
    const newDoc: Document = {
      id: newDocId,
      name: file.name,
      status: "processing",
      date: new Date().toLocaleDateString("en-GB"),
    };

    setDocuments((prev) => [...prev, newDoc]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:3001/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      const data = await response.json();
      
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDocId
            ? { ...doc, status: "ready", chunks: data.chunks }
            : doc
        )
      );
    } catch (error) {
      console.error(error);
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === newDocId ? { ...doc, status: "error" } : doc
        )
      );
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/chat/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: content }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: data.answer || data.response || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        sources: data.sources?.map((s: any) => `${s.metadata?.document} - Chunk ${s.metadata?.chunkIndex}`) || [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: "Sorry, I encountered an error while processing your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const clearDocuments = async () => {
    setDocuments([]);
    
    try {
      await fetch("http://localhost:3001/documents/clear", { method: "GET" });
    } catch (e) {
      console.error("Failed to clear backend database", e);
    }

    localStorage.removeItem("docchat_documents");
  };

  return (
    <ChatContext.Provider
      value={{
        documents,
        messages,
        uploadDocument,
        sendMessage,
        clearChat,
        clearDocuments,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}