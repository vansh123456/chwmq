import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import {io} from "socket.io-client";


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
      const res = await axios.get("http://localhost:8080/api/auth/check");

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
      const res = await axios.post("http://localhost:8080/api/auth/signup", data,{
        withCredentials: true,
      });
      set({ authUser: res.data });
      alert("Account created successfully");
      toast.success("Account created successfully");
      //get().connectSocket();
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
      const res = await axios.post("http://localhost:8080/api/auth/login", data,{
        withCredentials: true,
      });
      set({ authUser: res.data });
      alert("Logged in successfully");
      toast.success("Logged in successfully");
      //get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try{
      await axios.post("http://localhost:8080/api/auth/logout",{},{
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
  }
  

}));