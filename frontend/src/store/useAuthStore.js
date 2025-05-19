import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import {io} from "socket.io-client";
import { axiosInstance } from "../lib/axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";



export const useAuthStore = create((set, get) => ({

  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data,{
        withCredentials: true,
      });
      set({ authUser: res.data });
      alert("Account created successfully");
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
        console.log(error)
      alert(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async(data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data,{
        withCredentials: true,
      });
      set({ authUser: res.data });
      alert("Logged in successfully");
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try{
      await axiosInstance.post("/auth/logout",{},{
        withCredentials: true,
      });
      set({ authUser: null });
      alert("Logged out successfully");
      toast.success("Logged out successfully");
    }
    catch (error) {
      console.log("Error in logout:", error);
      toast.error(error.response.data.message);
    }
  },
  updateProfile: async(data) => {
    set({isUpdatingProfile: true});
    try{
      const res = await axiosInstance.put("/auth/update-profile",data,{
        withCredentials: true,
      });
      set({ authUser: res.data });
      alert("Profile updated successfully");
      toast.success("Profile updated successfully");
    }
    catch (error) {
      console.log("Error in updateProfile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
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
}));