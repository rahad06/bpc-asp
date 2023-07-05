import { create } from 'zustand'

const usePanelStore = create((set, get) => ({
    show: false, 
    setShow: (value) => set({show: value})
}))
export default usePanelStore;