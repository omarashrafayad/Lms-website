export interface IUserChat {
  _id: string;
  name: string;
  profileImg?: string;
  role: string;
}

export interface IConversation {
  _id: string;
  participants: IUserChat[];
  lastMessage?: IMessage;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  conversation: string;
  sender: IUserChat;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatResponse<T> {
  status: string;
  data: T;
}
