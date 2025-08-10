import { create } from "zustand";

const useMessageStore = create((set) => ({
    messages: [],
    setMessages: (messages) => set({ messages }),

    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

    updateMessage: (tempId, updates) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg.id === tempId ? { ...msg, ...updates } : msg
            ),
        })),
}));

export default useMessageStore;