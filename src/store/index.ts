import { create } from "zustand";

const useImunisasiStore = create((set) => ({
  dataStore: null,
  setDataStore: (dataStore:any) => set({ dataStore }),
  editGlobal: false,
  setEditGlobal: (editGlobal:boolean) => set({ editGlobal }),
}));


export default useImunisasiStore;