import { clientAxios } from "@/lib/axios/clientAxios";
import { ChatResponse, IConversation, IMessage, IUserChat } from "../types/chat.types";

export const getConversations = async () => {
    const res = await clientAxios.get<ChatResponse<IConversation[]>>("chats/conversations");
    return res.data;
};

export const getAvailableUsers = async () => {
    const res = await clientAxios.get<ChatResponse<IUserChat[]>>("chats/users");
    return res.data;
};

export const getMessages = async (conversationId: string) => {
    const res = await clientAxios.get<ChatResponse<IMessage[]>>(`chats/${conversationId}`);
    return res.data;
};

export const sendMessage = async (data: { recipientId?: string; content: string; conversationId?: string }) => {
    const res = await clientAxios.post<ChatResponse<IMessage>>("chats/send", data);
    return res.data;
};
