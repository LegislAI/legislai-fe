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
