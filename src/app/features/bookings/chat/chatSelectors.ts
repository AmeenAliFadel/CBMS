import type { RootState } from "../../../store";

export const selectChatMessages = (state: RootState) =>
    state.chat.messages;

export const selectChatLoading = (state: RootState) =>
    state.chat.loading;

export const selectChatSending = (state: RootState) =>
    state.chat.sending;