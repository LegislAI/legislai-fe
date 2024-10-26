import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Conversation } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ConversationState {
  conversations: { [conversationId: string]: Conversation };
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: {},
  loading: false,
  error: null,
};

interface AddMessagePayload {
  conversationId: string;
  message: string;
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    loadConversations: (state, action: PayloadAction<Conversation[]>) => {
      action.payload.forEach(conversation => {
        state.conversations[conversation.conversationId] = conversation;
      });
    },
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { conversationId, message } = action.payload;
      const messageId = state.conversations[conversationId].messages.length + 1;

      state.conversations[conversationId].messages.push({
        messageId: messageId.toString(),
        message: message,
        attachments: [],
        sender: 'user',
        createdAt: new Date().toISOString(),
      });
      state.conversations[conversationId].updatedAt = new Date().toISOString();
      state.loading = true;
    },
    addMessageToNewConversation: (state, action: PayloadAction<string>) => {
      const message = action.payload;
      const id = uuidv4().toString();

      state.conversations[id] = {
        conversationId: id,
        conversationName: 'Nova conversa',
        conversationField: 'Direito Civil',
        messages: [
          {
            messageId: '0',
            message: message,
            attachments: [],
            sender: 'user',
            createdAt: '',
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.loading = true;

      action.payload = id;
    },
  },
});

export const { loadConversations, addMessage, addMessageToNewConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
