import { create } from "zustand";

type UserStoreType = {
  name: string;
  setName: (newName: string) => void;
  //role: string;
};
export const useUserStore = create<UserStoreType>((set) => ({
  name: "",
  setName: (newName: string) => set({ name: newName }),
}));
