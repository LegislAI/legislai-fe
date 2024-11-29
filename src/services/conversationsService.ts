import { CONVERSATIONS_API } from '@/lib/api';
import { Message } from '@/types/conversations';

interface NewConversationPayload {
  messages: Message[];
  conversationName: string;
  conversationField: string;
  conversationId: string;
}

export const newConversation = async (data: NewConversationPayload) => {
  try {
    const response = await CONVERSATIONS_API.post('/new_conversation', {
      messages: data.messages.map(message => {
        return {
          message_index: message.messageIndex,
          sender: message.sender,
          timestamp: message.createdAt,
          message: message.message,
          attachments: message.attachments.map(attachment => {
            return {
              // content: attachment.content,
              // designation: attachment.designation,
              // url: attachment.url,
              summary: attachment.summary,
              reference: attachment.reference,
            };
          }),
        };
      }),
      conversation_name: data.conversationName,
      conversation_field: data.conversationField,
      conversation_id: data.conversationId,
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Error creating conversation.');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    const response = await CONVERSATIONS_API.delete(
      `/${conversationId}/delete`,
    );

    if (response.status === 200) {
      return response;
    } else if (response.status === 404) {
      throw new Error('Conversation not found.');
    } else {
      throw new Error('Error deleting conversation.');
    }
  } catch (error) {
    throw error;
  }
};

export const getConversation = async (conversationId: string) => {
  try {
    const response = await CONVERSATIONS_API.get(`/${conversationId}`);

    if (response.status === 200) {
      return response;
    } else if (response.status === 404) {
      throw new Error('Conversation not found.');
    } else {
      throw new Error('Error fetching conversation.');
    }
  } catch (error) {
    throw error;
  }
};

export const getLatestConversations = async () => {
  try {
    const response = await CONVERSATIONS_API.get(`/load_last_conversations`, {
      params: {
        offset: 0,
        limit: 10,
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Error fetching conversations.');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAllConversations = async () => {
  try {
    const response = await CONVERSATIONS_API.delete(
      '/delete_all_conversations',
    );

    if (response.status === 200) {
      return response;
    } else {
      throw new Error('Error deleting conversations.');
    }
  } catch (error) {
    throw error;
  }
};

export const addMessagesToConversation = async (
  conversationId: string,
  messages: Message[],
) => {
  try {
    const response = await CONVERSATIONS_API.post(
      `/${conversationId}/add_messages`,
      {
        messages: messages.map(message => {
          return {
            message_index: message.messageIndex,
            sender: message.sender,
            timestamp: message.createdAt,
            message: message.message,
            attachments: message.attachments.map(attachment => {
              return {
                // content: attachment.content,
                // designation: attachment.designation,
                // url: attachment.url,
                summary: attachment.summary,
                reference: attachment.reference,
              };
            }),
          };
        }),
      },
    );

    if (response.status === 200) {
      return response;
    } else if (response.status === 404) {
      throw new Error('Conversation not found.');
    } else {
      throw new Error('Error fetching conversation.');
    }
  } catch (error) {
    throw error;
  }
};

// export const loadMoreMessages = async (
//   userId: string,
//   conversationId: string,
//   offset: number,
//   limit: number,
// ) => {
//   try {
//     const response = await CONVERSATIONS_API.get(
//       `/${conversationId}/messages/load_last_messages`,
//       {
//         params: {
//           user_id: userId,
//           offset,
//           limit,
//         },
//       },
//     );

//     if (response.status === 200) {
//       return response;
//     } else {
//       throw new Error('Error fetching messages.');
//     }
//   } catch (error) {
//     throw error;
//   }
// };
