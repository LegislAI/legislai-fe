import {
  Conversation,
  Message,
  Atatchment,
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
    messages: conversation.messages.map(message => transformMessage(message)),
    createdAt: conversation.created_at || '',
    updatedAt: conversation.updated_at || '',
  };
};

const transformMessage = (message: MessageApiResponse): Message => {
  return {
    messageId: message.message_id,
    message: message.message,
    attachments: message.attachments.map(attachment =>
      transformAttachment(attachment),
    ),
    sender: message.sender,
    createdAt: message.created_at || '',
  };
};

const transformAttachment = (attachment: AttachmentApiResponse): Atatchment => {
  return {
    content: attachment.content,
    designation: attachment.designation,
    url: attachment.url,
  };
};
