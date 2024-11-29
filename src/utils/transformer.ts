import {
  Conversation,
  Message,
  Reference,
  ConversationApiResponse,
  MessageApiResponse,
  AttachmentApiResponse,
} from '@/types';

export const transformConversations = (
  conversations: ConversationApiResponse[],
): Conversation[] => {
  return conversations.map(conversation => transformConversation(conversation));
};

export const transformConversation = (
  conversation: ConversationApiResponse,
): Conversation => {
  return {
    conversationId: conversation.conversation_id,
    conversationName: conversation.conversation_name,
    conversationField: conversation.conversation_field,
    messages: conversation.messages.map(message => transformMessage(message)),
    createdAt: conversation.created_at || '',
    updatedAt: conversation.updated_at || '',
    loading: false ? '' : '',
    isNewConversation: false,
  };
};

const transformMessage = (message: MessageApiResponse): Message => {
  return {
    messageIndex: message.message_index,
    message: message.message,
    attachments: [],
    references: message.attachments.map(attachment =>
      transformAttachment(attachment),
    ),
    sender: message.sender,
    createdAt: message.created_at || '',
  };
};

const transformAttachment = (attachment: AttachmentApiResponse): Reference => {
  return {
    designation: attachment.summary,
    url: attachment.reference,
  };
};
