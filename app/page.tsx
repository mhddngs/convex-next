"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import MessageList from "./_components/MessageList";

export default function Home() {
  const messages = useQuery(api.messages.get);
  const sendMessage = useMutation(api.messages.create);

  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("Micah");
  const [editingMode, setEditngMode] = useState(true);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage({ body: input, author: author });
    setInput("");
  }

  return (
    <main className="min-h-screen flex-col p-6">
      <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gray-50 shadow-md">
        <h1 className="py-4 font-semibold">Messages</h1>
        <div className="flex h-full w-full flex-col justify-between space-y-2 pb-4">
          <MessageList messages={messages} author={author} />
          <div className="px-4">
            <div className="flex w-full flex-col self-start overflow-hidden rounded-full shadow transition-all focus-within:ring-4">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="w-full px-4 py-2 shadow-sm focus:outline-none"
                  placeholder="Send a message"
                  onChange={handleInputChange}
                  value={input}
                />
              </form>
            </div>
          </div>
          <small className="items-start self-start px-6 text-gray-500">
            Sending as{" "}
            {editingMode ? (
              <input
                className="bg-transparent"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            ) : (
              <>{author}</>
            )}
          </small>
        </div>
      </div>
    </main>
  );
}
