import { create } from 'zustand'

const usePanelStore = create((set, get) => ({
    show: false,
    showSignup: false,
    setShow: (value) => set({show: value}),
    setShowSignup: (value) => set({showSignup: value})
}))
export default usePanelStore;