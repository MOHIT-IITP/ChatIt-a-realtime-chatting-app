import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ?  "http://localhost:5001": "/";

export const useAuthStore = create((set, get) => ({
  userAuth: null,
  isSigningIn: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ userAuth: res.data });

      get().connectSocket();
    } catch (error) {
      console.log("Error in check auth frontend", error);
      set({ userAuth: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ userAuth: res.data });
      toast.success("User created successfully");

      get().connectSocket();
    } catch (error) {
      console.log("Error in signin auth user");
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ userAuth: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout Auth store");
      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("LoggedIn Successfully");
      set({ userAuth: res.data });

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  connectSocket: () => {
    const { userAuth } = get();
    if (!userAuth || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: userAuth._id,
      },
    });

    socket.connect();
    set({ socket: socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
  profileupdate: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ userAuth: res.data });
      toast.success("Profile Picture updated successfully");
    } catch (error) {
      console.log("Error in update profile", error);
      toast.error(error.response.data.messages);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
