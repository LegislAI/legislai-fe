export type Conversation = {
  conversationId: string;
  conversationName: string;
  conversationField: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  loading: string; // index of the message that is being sent
  isNewConversation: boolean;
};

export type Message = {
  messageIndex: string;
  message: string;
  attachments: FileInfo[];
  references: Reference[];
  sender: string;
  createdAt: string;
};

export type FileInfo = {
  name: string;
  type: string;
  value: string;
};

export type Reference = {
  designation: string;
  url: string;
};

export interface ConversationApiResponse {
  conversation_id: string;
  conversation_name: string;
  conversation_field: string;
  messages: MessageApiResponse[];
  created_at: string;
  updated_at: string;
}

export interface MessageApiResponse {
  message_index: string;
  message: string;
  attachments: AttachmentApiResponse[];
  sender: string;
  created_at: string;
}

export interface AttachmentApiResponse {
  summary: string;
  reference: string;
}
