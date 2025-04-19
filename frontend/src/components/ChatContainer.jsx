import { useEffect, useRef, useState } from "react";
import { formatMessageTime } from "./FormateTime";
import { useChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { MessageSkeleton } from "./MessageSkeleton";
import { useAuthStore } from "../store/authStore";

export const ChatContainer = () => {
  const [showinfo, setShowinfo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const {
    messages,
    getMessages,
    isMessageLoading,
    selectedUser,
    listenToMessages,
    unlinkToMessages,
  } = useChatStore();
  const { userAuth } = useAuthStore();
  const { handleDelete, handleEdit, handleReaction } = useChatStore();
  const messagesEndRef = useRef(null);

  // fetching messages every second so that we can see the new messages
  useEffect(() => {
    const interval = setInterval(() => {
      getMessages(selectedUser._id);
    }, 500); 

    return () => clearInterval(interval); 
  }, [selectedUser._id, getMessages]);

  // this will work if user changes
  useEffect(() => {
    getMessages(selectedUser._id);
    listenToMessages();
    return () => unlinkToMessages();
  }, [selectedUser._id, getMessages, listenToMessages, unlinkToMessages]);

  // this useeffect used because , when new message come then scroll to new message,, 
  // but due to continuous fetching of the message this is not working properly 
  // useEffect(() => {
  //   if (messagesEndRef && messages) {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // });

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === userAuth._id ? "chat-end" : "chat-start"
            }`}
            ref={
              message._id === messages[messages.length - 1]._id
                ? messagesEndRef
                : null
            }
          >
            <div className="chat-image avatar ">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === userAuth._id
                      ? userAuth.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="avatar"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="flex gap-10 flex-row-reverse  ">
              <div
                className="chat-bubble flex flex-col"
                onClick={() =>
                  setShowinfo((prev) =>
                    prev === message._id ? false : message._id
                  )
                }
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
                <div className="absolute -bottom-5 right-0">
                  {message.reaction && <i style={{
                    fontSize: "1.5rem",
                  }} 
                   class={`${message.reaction}`}></i>}
                </div>
              </div>
              <div
                className={`p-4 chat-bubble ${
                  showinfo === message._id ? "" : "hidden"
                }`}
              >
                <p onClick={() => setEdit(!edit)} className="cursor-pointer">
                  Edit
                </p>
                <div className={` flex gap-2 relative ${edit ? "" : "hidden"}`}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border-1"
                  />
                  <button
                    onClick={() => {
                      handleEdit(message._id, editText);
                      setEditText("");
                      setEdit(false);
                      showinfo(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-send-horizontal-icon lucide-send-horizontal"
                    >
                      <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                      <path d="M6 12h16" />
                    </svg>
                  </button>
                </div>
                <p
                  className="cursor-pointer"
                  onClick={() => {handleDelete(message._id);
                    showinfo(false);
                  }}
                >
                  Delete for everyone
                </p>
                <div>
                  <div className={` flex gap-2`}>
                    <ul
                      onClick={() =>
                        handleReaction(message._id, "ri-heart-fill")
                      }
                    >
                      <i class="ri-heart-fill" style={{ fontSize: "1.5rem" }}></i>
                    </ul>
                    <ul
                      onClick={() =>
                        handleReaction(message._id, "ri-emotion-happy-fill")
                      }
                    >
                      <i class="ri-emotion-happy-fill" style={{ fontSize: "1.5rem" }}></i>
                    </ul>
                    <ul
                      onClick={() =>
                        handleReaction(message._id, "ri-emotion-laugh-fill")
                      }
                    >
                      <i class="ri-emotion-laugh-fill" style={{ fontSize: "1.5rem" }}></i>
                    </ul>
                    <ul
                      onClick={() =>
                        handleReaction(message._id, "ri-skull-fill")
                      }
                    >
                      <i class="ri-skull-fill" style={{ fontSize: "1.5rem" }}></i>
                    </ul>
                    <ul
                      onClick={() =>
                        handleReaction(message._id, "ri-emotion-sad-fill")
                      }
                    >
                      <i class="ri-emotion-sad-fill" style={{ fontSize: "1.5rem" }}></i>
                    </ul>
                  </div>
                </div>
                <p className="text-sm text-neutral-500">
                  Click on message to hide this
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};
