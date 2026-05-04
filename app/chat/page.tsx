"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const PROJECT_ID = "69f4d13d1d87edb5dd3f05da";
const PRODUCT_INSTANCE_ID = "69f4d7776593b48a5d8489c5";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages, isLoading]);

  async function handleSend() {
    if (!input.trim() || isLoading) {
      return;
    }

    try {
      const message = input;
      setIsLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: PROJECT_ID,
          productInstanceId: PRODUCT_INSTANCE_ID,
          message
        })
      });
      const result = await response.json();

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "user", content: message },
        { role: "assistant", content: result.text }
      ]);
      setInput("");
    } catch (error) {
      console.error("Failed to send chat message:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Chat</h1>

      <div className="min-h-96 space-y-3 rounded-lg border bg-white p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 break-words ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200 px-4 py-2 text-black">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 rounded-lg border p-2"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          className="rounded-lg border px-4 py-2 disabled:opacity-60"
          type="button"
          onClick={handleSend}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
