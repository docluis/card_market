import { create } from "zustand";

const useStore = create((set) => ({
  username: "",
  setUsername: (username: string) => set({ username }),
}));

export default useStore;
