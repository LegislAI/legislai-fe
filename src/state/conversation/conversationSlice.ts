import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Conversation } from '@/types';
// import { v4 as uuidv4 } from 'uuid';

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
    addLocalMessage: (state, action: PayloadAction<AddMessagePayload>) => {
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

      // if (!conversationId || !state[conversationId]) {
      //   const id = uuidv4().toString();
      //   state[id].conversation = {
      //     conversationId: id,
      //     conversationName: 'New Conversation',
      //     messages: [message],
      //     createdAt: new Date().toISOString(),
      //     updatedAt: new Date().toISOString(),
      //   };
      //   state[id].loading = true;
      // } else {
      //   state[conversationId].conversation.messages.push(message);
      //   state[conversationId].conversation.updatedAt = new Date().toISOString();
      //   state[conversationId].loading = true;
      // }
    },
  },
});

export const { addLocalMessage, loadConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
