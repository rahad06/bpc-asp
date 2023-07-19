import { create } from 'zustand'

const usePanelStore = create((set, get) => ({
    show: false,
    showSignup: false,
    user: null,
    authenticated: false,
    roles: [],
    setRoles: (value) => set({roles: value}),
    setAuthenticated: (value) => set({authenticated: value}),
    setShow: (value) => set({show: value}),
    setShowSignup: (value) => set({showSignup: value})
}))
export default usePanelStore;