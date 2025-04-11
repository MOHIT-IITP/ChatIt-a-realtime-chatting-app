import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/useChatStore";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="flex justify-between p-4 items-center ">
      <div className="flex justify-center gap-4 items-center">
        <div>
          <img
            src={selectedUser.profilePic || "./avatar.png"}
            alt="profilepic"
            className="size-14 rounded-full"
          />
        </div>
        <div>
          <div className="text-xl font-bold">{selectedUser.fullName}</div>
          <div>
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => setSelectedUser(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
