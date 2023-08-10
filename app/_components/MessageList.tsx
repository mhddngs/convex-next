"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function MessageList({ messages, author }) {
  const classes = {
    self: "p-2 px-4 text-white bg-blue-600 rounded-full rounded-br-none",
    opponent: "p-2 px-4 text-gray-800 bg-gray-200 rounded-full rounded-bl-none",
  };
  return (
    <>
      {messages?.map((message) => {
        const isSelf = message.author.toLowerCase() === author.toLowerCase();
        return (
          <div key={message._id} className="mt-auto flex flex-col">
            <div
              className={`flex flex-col ${
                isSelf ? "mr-4 self-end" : "ml-4 self-start"
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
