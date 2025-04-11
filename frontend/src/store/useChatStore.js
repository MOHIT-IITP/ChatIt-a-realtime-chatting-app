import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore.js";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessages: async (MessageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        MessageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  handleDelete: async (messageId) => {
    try {
      await axiosInstance.post(`/message/delete/${messageId}`);
      set({ messages: get().messages.filter((msg) => msg._id !== messageId) });
      toast.success("Message deleted successfully.");
    } catch (error) {
      toast.error("Something went wrong while deleting the message");
    }
  },

  handleEdit: async (messageId, editText) => {
    try {
      await axiosInstance.put(`/message/edit/${messageId}`, {
        editText,
      });
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? { ...msg, text: editText } : msg,
        ),
      });
      toast.success("Message updated successfully");
    } catch (error) {
      toast.error("Something went wrong in editing the message");
    }
  },

  handleReaction: async (messageId, reactionEdit) => {
    try {
      await axiosInstance.put(`/message/reaction/${messageId}`, {
        reactionEdit,
      });
      set({
        messages: get().messages.map((msg) =>
          msg._id === messageId ? { ...msg, reaction: reactionEdit } : msg,
        ),
      });
    } catch (error) {
      toast.error("Something went wrong in reaction Update Section");
    }
  },

  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unlinkToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
