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
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

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
        <div className={cn(
          "max-w-6xl mx-auto flex flex-col lg:flex-row h-auto lg:h-[800px] bg-card rounded-[3.5rem] shadow-2xl border border-border overflow-hidden relative",
          !currentUser ? "items-center justify-center py-20" : ""
        )}>

          {!currentUser ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 px-10 max-w-sm">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl animate-pulse" />
                <div className="relative h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Users className="text-primary" size={32} />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{t("mustLogin")}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  {t("joinCommunity")}
                </p>
              </div>
              <Link 
                href="/auth" 
                className={cn(
                  buttonVariants({ variant: 'default' }), 
                  "h-14 px-12 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                )}
              >
                {t("loginNow")}
              </Link>
            </div>
          ) : (
            <>
              {/* Sidebar */}
              <div className={cn(
                "w-full lg:w-[380px] h-[500px] lg:h-full border-b lg:border-b-0 lg:border-r border-border flex flex-col bg-card transition-all duration-500  ",
                selectedConvId || activeRecipient ? "hidden lg:flex" : "flex"
              )}>
            <div className="p-8 lg:p-10 border-b border-border bg-card sticky top-0 z-10 space-y-8 h-[120px] lg:h-[150px] flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <div className="space-y-1 text-left ">
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
              {isStartingNewChat ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-4 ">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">
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
          <div className="flex-1 flex flex-col bg-card relative min-w-0">
            {activeRecipient ? (
              <>
                {/* Header */}
                <div className="p-8 lg:p-10 border-b border-border flex items-center justify-between bg-card relative z-20 h-[120px] lg:h-[150px] ">
                  <div className="flex items-center gap-6 ">
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
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="h-16 w-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary/20">
                  <MessageSquare size={32} />
                </div>
                <p className="text-sm font-black text-muted-foreground uppercase tracking-widest">
                   {t("noSelect")}
                </p>
              </div>
            )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
