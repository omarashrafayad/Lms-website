import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAvailableUsers, getConversations, getMessages, sendMessage } from "../api/chat";

export const useConversations = () => {
    return useQuery({
        queryKey: ["conversations"],
        queryFn: getConversations,
    });
};

export const useAvailableUsers = () => {
    return useQuery({
        queryKey: ["available-users"],
        queryFn: getAvailableUsers,
    });
};

export const useMessages = (conversationId: string) => {
    return useQuery({
        queryKey: ["messages", conversationId],
        queryFn: () => getMessages(conversationId),
        enabled: !!conversationId,
        refetchInterval: 5000, // Simple polling for "real-time" Feel
    });
};

export const useSendMessage = (conversationId?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            if (conversationId) {
                queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
            }
            queryClient.invalidateQueries({ queryKey: ["conversations"] });
        },
    });
};
