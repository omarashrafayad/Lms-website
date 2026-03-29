"use client";

import { useState } from "react";
import { MessageSquare, Users, Loader2, ArrowLeft, Search, PlusCircle } from "lucide-react";
import { useConversations, useAvailableUsers, useMessages, useSendMessage } from "../hooks/useChat";
import { IConversation, IUserChat } from "../types/chat.types";
import ChatList from "../components/ChatList";
import ChatThread from "../components/ChatThread";
import UserPicker from "../components/UserPicker";
import ChatInput from "../components/ChatInput";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";

export default function ChatPage() {
  const t = useTranslations("chat");
  const rT = useTranslations("roles");
  const locale = useLocale();
  const { user: currentUser } = useAuthStore();
  const { data: convData, isLoading: isConvLoading } = useConversations();
  const { data: usersData, isLoading: isUsersLoading } = useAvailableUsers();

  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [activeRecipient, setActiveRecipient] = useState<IUserChat | null>(null);
  const [isStartingNewChat, setIsStartingNewChat] = useState(false);

  const { data: messagesData, isLoading: isMessagesLoading } = useMessages(selectedConvId || "");
  const sendMessageMutation = useSendMessage(selectedConvId || undefined);

  const conversations = convData?.data || [];
  const users = usersData?.data || [];
  const messages = messagesData?.data || [];

  const handleSelectConv = (id: string) => {
    setSelectedConvId(id);
    const conv = conversations.find((c) => c._id === id);
    if (conv) {
      const recipient = conv.participants.find((p) => p._id !== currentUser?._id);
      if (recipient) setActiveRecipient(recipient);
    }
    setIsStartingNewChat(false);
  };

  const handleStartNewChat = (recipientId: string) => {
    const existingConv = conversations.find((c) =>
      c.participants.some((p) => p._id === recipientId)
    );

    if (existingConv) {
      handleSelectConv(existingConv._id);
    } else {
      const recipient = users.find((u) => u._id === recipientId);
      if (recipient) {
        setActiveRecipient(recipient);
        setSelectedConvId(null);
        setIsStartingNewChat(false);
      }
    }
  };

  const handleSendMessage = (content: string) => {
    sendMessageMutation.mutate({
      recipientId: selectedConvId ? undefined : activeRecipient?._id,
      conversationId: selectedConvId || undefined,
      content,
    }, {
      onSuccess: (res) => {
        if (!selectedConvId) {
          setSelectedConvId((res.data.conversation as any));
        }
      }
    });
  };

  return (
    <div className="bg-muted/30 min-h-screen py-12 lg:py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row h-[800px] bg-card rounded-[3.5rem] shadow-2xl border border-border overflow-hidden relative rtl:flex-row-reverse">

          {/* Sidebar */}
          <div className={cn(
            "w-full lg:w-[380px] border-r border-border flex flex-col bg-card transition-all duration-500 rtl:border-r-0 rtl:border-l",
            selectedConvId || activeRecipient ? "hidden lg:flex" : "flex"
          )}>
            <div className="p-8 lg:p-10 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10 space-y-8">
              <div className="flex items-center justify-between rtl:flex-row-reverse">
                <div className="space-y-1 text-left rtl:text-right">
                  <h1 className="text-3xl font-black text-foreground tracking-tighter">{t("messages").toUpperCase()}</h1>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{t("connect")}</p>
                </div>
                {currentUser && (
                  <Button
                    onClick={() => setIsStartingNewChat(!isStartingNewChat)}
                    className="h-12 w-12 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition scale-90 hover:scale-100 cursor-pointer"
                  >
                    <PlusCircle size={22} />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar space-y-8">
              {!currentUser ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 px-10">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <Search className="text-muted-foreground/30" size={24} />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                    {t("mustLogin")}
                  </p>
                </div>
              ) : isStartingNewChat ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-4 rtl:flex-row-reverse">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest rtl:text-right">
                      {t("available")} {currentUser?.role === 'student' ? rT('instructor') : rT('student')}
                    </p>
                    <button onClick={() => setIsStartingNewChat(false)} className="text-[10px] font-bold text-muted-foreground uppercase hover:text-foreground transition">{t("cancel")}</button>
                  </div>
                  {isUsersLoading ? (
                    <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary/20" /></div>
                  ) : (
                    <UserPicker users={users} onSelect={handleStartNewChat} />
                  )}
                </div>
              ) : isConvLoading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-primary/20" /></div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 px-10">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                    <MessageSquare className="text-muted-foreground/30" size={24} />
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                    {t("noMessages")}
                  </p>
                </div>
              ) : (
                <ChatList
                  conversations={conversations}
                  selectedId={selectedConvId || undefined}
                  onSelect={handleSelectConv}
                />
              )}
            </div>
          </div>

          {/* Chat Main Area */}
          <div className="flex-1 flex flex-col bg-card relative">
            {activeRecipient ? (
              <>
                {/* Header */}
                <div className="p-6 lg:p-8 border-b border-border flex items-center justify-between bg-card relative z-20 shadow-sm border-2 rtl:flex-row-reverse">
                  <div className="flex items-center gap-6 rtl:flex-row-reverse">
                    <button
                      onClick={() => {
                        setSelectedConvId(null);
                        setActiveRecipient(null);
                      }}
                      className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-muted text-muted-foreground hover:text-primary transition"
                    >
                      <ArrowLeft size={20} className="rtl:rotate-180" />
                    </button>
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-2 border-primary/10 p-1 bg-card">
                        <AvatarImage src={activeRecipient.profileImg} className="rounded-full" />
                        <AvatarFallback className="bg-primary/10 text-primary font-black">
                          {activeRecipient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-left rtl:text-right">
                      <h3 className="text-xl font-bold text-foreground tracking-tight leading-none mb-2 max-[430px]:text-sm">{activeRecipient.name}</h3>
                      <div className="flex items-center gap-2 rtl:flex-row-reverse">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{rT(activeRecipient.role.toLowerCase() as any)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-3">
                    <Button className="h-10 px-6 rounded-xl bg-muted text-muted-foreground font-bold hover:bg-muted/80 hover:text-foreground border-2 border-transparent transition cursor-pointer">
                      {t("messages")}
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-hidden relative">
                  <ChatThread messages={messages} isLoading={isMessagesLoading} />
                </div>

                {/* Input */}
                <ChatInput
                  onSend={handleSendMessage}
                  isLoading={sendMessageMutation.isPending}
                />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-24 text-center space-y-8 bg-muted/10">
                <div className="relative h-50 w-50 max-[430px]:h-40 max-[430px]:w-40 flex items-center justify-center drop-shadow-2xl">
                  <div className="absolute inset-0 bg-primary/10 rounded-[4rem] rotate-6 animate-pulse" />
                  <div className="absolute inset-0 bg-card rounded-[4rem] group hover:-rotate-3 transition-transform duration-700 p-6">
                    <div className="h-full w-full rounded-[3rem] bg-primary/5 flex flex-col items-center justify-center space-y-6">
                      <Users className="text-primary/20 h-20 w-20 " />
                      <div className="w-px h-12 bg-primary/10" />
                      <MessageSquare className="text-primary h-12 w-12 " />
                    </div>
                  </div>
                </div>
                <div className="max-w-md space-y-6">
                  <h2 className="text-4xl lg:text-3xl max-md:text-2xl max-[430px]:text-md font-black text-foreground tracking-tighter uppercase">{t("welcome")}</h2>
                  <p className="text-muted-foreground font-medium leading-relaxed line-clamp-2">
                    {!currentUser ? t("mustLogin") : t("welcomeDesc")}
                  </p>
                  {currentUser && (
                    <Button
                      onClick={() => setIsStartingNewChat(true)}
                      className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-16 max-[580px]:h-12 max-[430px]:px-8 max-[430px]:text-sm font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/30 cursor-pointer"
                    >
                      {t("findMentor")}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
