import type { ChatMessage } from "../types/chat";

export const MAX_CHAT_HISTORY = 8;

export const trimChatHistory = (messages: ChatMessage[]) =>
  messages.slice(-MAX_CHAT_HISTORY);
