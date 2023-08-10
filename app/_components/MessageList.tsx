"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";

type Messages = Doc<"messages">;

type MessageListProps = {
  messages: Messages[] | undefined;
  author: string;
};

export default function MessageList({ messages, author }: MessageListProps) {
  const classes = {
    self: "p-2 px-4 text-white bg-gradient-to-b from-cyan-500 to-blue-500 rounded-3xl rounded-br-none",
    opponent: "p-2 px-4 text-gray-800 bg-gray-200 rounded-3xl rounded-bl-none",
  };
  return (
    <>
      {messages?.map((message) => {
        const isSelf = message.author.toLowerCase() === author.toLowerCase();
        return (
          <div key={message._id} className="mt-auto flex flex-col">
            <div
              className={`flex flex-col ${
                isSelf ? "ml-4 mr-4 self-end" : "ml-4 mr-4 self-start"
              }`}
            >
              <div className={isSelf ? classes.self : classes.opponent}>
                {message.body}
              </div>
              <small
                className={`text-gray-500 ${
                  isSelf ? "text-right" : "text-left"
                }`}
              >
                {message.author || "Anon"}
              </small>
            </div>
          </div>
        );
      })}
    </>
  );
}
