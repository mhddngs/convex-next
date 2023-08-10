"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageList from "./_components/MessageList";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

export default function Home() {
  const messages = useQuery(api.messages.get);

  const sendMessage = useMutation(api.messages.create);

  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("");
  const [editingMode, setEditngMode] = useState(false);
  const notEmpty = input.length > 0;

  const convoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (convoRef.current) {
      convoRef.current.scrollTop = convoRef.current.scrollHeight;
    }
  }, [messages]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }
  function handleAuthorChange(e: ChangeEvent<HTMLInputElement>) {
    setAuthor(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!notEmpty || author.length === 0) {
      return;
    }
    sendMessage({ body: input, author: author });
    setInput("");
  }

  return (
    <main className="flex max-h-[100svh] min-h-[100svh] flex-col justify-start p-6">
      <div className="relative flex max-h-full grow flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md">
        <div className="w-full self-center bg-gray-100 py-4 text-center font-semibold">
          <h1 className="">🍕 Social</h1>
          <small className="items-start self-start px-6 text-gray-500">
            {author.length > 0 ? `Chatting as ${author} ` : null}
            <Popover.Root onOpenChange={() => setEditngMode(!editingMode)}>
              <Popover.Trigger>
                <a className="font-medium text-blue-500">
                  {author.length > 0
                    ? editingMode
                      ? "Save"
                      : "Change alias"
                    : "Set an alias to start chatting"}
                </a>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="rounded-full bg-white p-4 shadow-lg ring-1 ring-gray-100">
                  <input
                    value={author}
                    onChange={handleAuthorChange}
                    className="outline-none"
                  ></input>
                  <Popover.Close />
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </small>
        </div>
        {/* Conversation Container */}
        <div
          ref={convoRef}
          className="flex-col-reverse= flex h-full max-h-full grow flex-col space-y-1 overflow-y-scroll pb-2"
        >
          <MessageList messages={messages} author={author} />
        </div>
        {/* End Convo Container */}
        {/* Input */}
        <div className="flex w-full flex-col space-y-4 pb-4">
          <div className="px-4">
            <div className="flex w-full flex-col self-start overflow-hidden rounded-full shadow transition-all focus-within:accent-blue-500">
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-row bg-white py-1 pr-1"
              >
                <input
                  type="text"
                  className="flex-1 bg-transparent px-4 outline-none"
                  placeholder="Send a message"
                  onChange={handleInputChange}
                  value={input}
                />
                <button
                  className={`${
                    notEmpty
                      ? "rotate-0 bg-blue-500 text-white"
                      : "rotate-90 bg-gray-200"
                  } flex items-center justify-center rounded-full p-3 transition-all`}
                >
                  <ArrowUpIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* End Input */}
      </div>
    </main>
  );
}
