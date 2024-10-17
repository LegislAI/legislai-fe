export interface ConversationApiResponse {
  conversation_id: string;
  conversation_name: string;
  messages: MessageApiResponse[];
  created_at: string;
  updated_at: string;
}

export interface MessageApiResponse {
  message_id: string;
  message: string;
  attachments: AttachmentApiResponse[];
  sender: string;
  created_at: string;
}

export interface AttachmentApiResponse {
  content: string;
  designation: string;
  url: string;
}

export type Conversation = {
  conversationId: string;
  conversationName: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  messageId: string;
  message: string;
  attachments: Atatchment[];
  sender: string;
  createdAt: string;
};

export type Atatchment = {
  content: string;
  designation: string;
  url: string;
};
