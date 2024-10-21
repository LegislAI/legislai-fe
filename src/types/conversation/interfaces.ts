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
