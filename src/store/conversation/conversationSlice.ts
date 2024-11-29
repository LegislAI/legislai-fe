import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { Reference, Conversation } from '@/types';
import { FileInfo } from '@/types/conversations';

interface ConversationState {
  conversations: { [conversationId: string]: Conversation };
  error: string | null;
}

const initialState: ConversationState = {
  conversations: {},
  error: null,
};

interface StreamingPayload {
  conversationId: string;
  question: string;
  attachments?: FileInfo[];
  isNewConversation: boolean;
}

export const sendMessageToRagApi = createAsyncThunk(
  'conversation/sendMessageToRagApi',
  async (payload: StreamingPayload, { dispatch, rejectWithValue }) => {
    const { conversationId, question, isNewConversation } = payload;
    let summary = '';
    let reference = '';
    let field = '';

    if (isNewConversation === false) {
      dispatch(
        addMessage({
          conversationId: payload.conversationId,
          question: payload.question,
          attachments: payload.attachments || [],
        }),
      );
    }

    try {
      const tokenResponse = await fetch('/api/auth/token');
      const { token: accessToken } = await tokenResponse.json();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_RAG_API_BASE_URL}/query`,
        {
          method: 'POST',
          headers: {
            Accept: 'text/event-stream',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            query: question,
          }),
        },
      );

      if (response.status === 400) {
        throw new Error('Query limit exceeded');
      } else if (response.status !== 200) {
        throw new Error('Error sending message to RAG API.');
      }

      const reader = response.body?.getReader();
      const textDecoder = new TextDecoder();

      if (!reader) {
        throw new Error('Error creating a reader from the response.');
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = textDecoder.decode(value);
        const events = chunk.split('\n\n');

        events.forEach(event => {
          if (event.startsWith('data: ')) {
            const parsedChunk = JSON.parse(event.replace('data: ', ''));
            summary = parsedChunk.summary;
            reference = parsedChunk.references;
            field = parsedChunk.field;

            dispatch(
              updateStreamingMessage({
                conversationId: conversationId,
                chunk: parsedChunk.response,
              }),
            );
          }
        });
      }

      dispatch(
        finishStreamingMessage({
          conversationId: payload.conversationId,
          conversationName: summary,
          conversationField: field,
          references: [
            {
              designation: '',
              url: reference,
            },
          ],
        }),
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Error sending message to RAG API.',
      );
    }
  },
);

interface AddMessageToNewConversationPayload {
  message: string;
  attachments: FileInfo[];
}

export const addMessageToNewConversationThunk = createAsyncThunk(
  'conversation/addMessageToNewConversation',
  async (payload: AddMessageToNewConversationPayload, { dispatch }) => {
    const conversationId = uuidv4().toString();

    dispatch(
      addMessageToNewConversation({
        conversationId: conversationId,
        question: payload.message,
        attachments: payload.attachments,
      }),
    );

    return conversationId;
  },
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },

    loadConversations: (state, action: PayloadAction<Conversation[]>) => {
      action.payload.forEach(conversation => {
        state.conversations[conversation.conversationId] = conversation;
      });
    },

    addMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        question: string;
        attachments: FileInfo[];
      }>,
    ) => {
      const { conversationId, question, attachments } = action.payload;
      const lastMessageIndex =
        state.conversations[conversationId].messages.length - 1;
      const currentDateTime = new Date().toISOString();

      state.conversations[conversationId].messages.push({
        messageIndex: (lastMessageIndex + 1).toString(),
        message: question,
        attachments: attachments,
        references: [],
        sender: 'user',
        createdAt: currentDateTime,
      });
      state.conversations[conversationId].messages.push({
        messageIndex: (lastMessageIndex + 2).toString(),
        message: '',
        attachments: [],
        references: [],
        sender: 'ai',
        createdAt: '',
      });
      state.conversations[conversationId].updatedAt = currentDateTime;
      state.conversations[conversationId].loading = (
        lastMessageIndex + 2
      ).toString();
    },

    addMessageToNewConversation: (
      state,
      action: PayloadAction<{
        conversationId: string;
        question: string;
        attachments: FileInfo[];
      }>,
    ) => {
      const { conversationId, question, attachments } = action.payload;
      const currentDateTime = new Date().toISOString();

      state.conversations[conversationId] = {
        conversationId: conversationId,
        conversationName: 'Nova conversa',
        conversationField: '',
        messages: [
          {
            messageIndex: '0',
            message: question,
            attachments: attachments,
            references: [],
            sender: 'user',
            createdAt: currentDateTime,
          },
          {
            messageIndex: '1',
            message: '',
            attachments: [],
            references: [],
            sender: 'ai',
            createdAt: currentDateTime,
          },
        ],
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
        loading: '1',
        isNewConversation: true,
      };
    },

    updateStreamingMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        chunk: string;
      }>,
    ) => {
      const { conversationId, chunk } = action.payload;

      const lastMessageIndex =
        state.conversations[conversationId].messages.length - 1;

      if (
        state.conversations[conversationId].loading ===
        lastMessageIndex.toString()
      ) {
        state.conversations[conversationId].loading = '';
      }

      state.conversations[conversationId].messages[lastMessageIndex].message +=
        chunk;
    },

    finishStreamingMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        conversationName: string;
        conversationField: string;
        references: Reference[];
      }>,
    ) => {
      const {
        conversationId,
        conversationName,
        conversationField,
        references,
      } = action.payload;
      const lastMessageIndex =
        state.conversations[conversationId].messages.length - 1;
      const currentDateTime = new Date().toISOString();

      if (state.conversations[conversationId].isNewConversation) {
        state.conversations[conversationId].conversationName = conversationName;
        state.conversations[conversationId].conversationField =
          conversationField;
        state.conversations[conversationId].isNewConversation = false;
      }

      state.conversations[conversationId].messages[
        lastMessageIndex
      ].references = references;
      state.conversations[conversationId].updatedAt = currentDateTime;
      state.conversations[conversationId].loading = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(sendMessageToRagApi.rejected, (state, action) => {
      if (action.payload === 'Query limit exceeded') {
        state.error = 'Limite de perguntas excedido';
      } else {
        state.error = 'Erro ao enviar mensagem';
      }
    });
  },
});

export const {
  clearError,
  loadConversations,
  addMessage,
  addMessageToNewConversation,
  updateStreamingMessage,
  finishStreamingMessage,
} = conversationSlice.actions;

export default conversationSlice.reducer;
