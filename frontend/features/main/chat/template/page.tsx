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

export default function ChatPage() {
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
    // Check if conversation already exists
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
          // If we started a new chat, the response should give us the convo ID or we can refresh
          // For now, simpler: invalidate and the next fetch should bring the convo
          setSelectedConvId((res.data.conversation as any));
        }
      }
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row h-[800px] bg-white rounded-[3.5rem] shadow-2xl border border-slate-50 overflow-hidden relative">
          
          {/* Sidebar */}
          <div className={cn(
             "w-full lg:w-[380px] border-r border-slate-50 flex flex-col bg-white transition-all duration-500",
             selectedConvId || activeRecipient ? "hidden lg:flex" : "flex"
          )}>
            <div className="p-8 lg:p-10 border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-10 space-y-8">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <h1 className="text-3xl font-black text-slate-800 tracking-tighter">MESSAGES</h1>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Connect with mentors</p>
                  </div>
                  <Button
                    onClick={() => setIsStartingNewChat(!isStartingNewChat)}
                    className="h-12 w-12 rounded-full bg-primary/5 text-primary hover:bg-primary hover:text-white transition scale-90 hover:scale-100 cursor-pointer"
                  >
                     <PlusCircle size={22} />
                  </Button>
               </div>
               
               <div className="relative group/search">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search people..." 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-4 pl-14 pr-6 text-xs font-bold text-slate-800 outline-none focus:border-primary/20 focus:bg-white transition-all shadow-inner" 
                  />
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar space-y-8">
              {isStartingNewChat ? (
                <div className="space-y-6">
                   <div className="flex items-center justify-between px-4">
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest">Available {currentUser?.role === 'student' ? 'Instructors' : 'Students'}</p>
                      <button onClick={() => setIsStartingNewChat(false)} className="text-[10px] font-bold text-slate-300 uppercase hover:text-slate-600 transition">Cancel</button>
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
                    <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <MessageSquare className="text-slate-200" size={24} />
                    </div>
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-relaxed">No conversations yet. Start a chat with one of the mentors.</p>
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
          <div className="flex-1 flex flex-col bg-white relative">
            {activeRecipient ? (
              <>
                {/* Header */}
                <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between bg-white relative z-20 shadow-sm border-2">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => {
                        setSelectedConvId(null);
                        setActiveRecipient(null);
                      }}
                      className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className="relative">
                       <Avatar className="h-14 w-14 border-2 border-primary/10 p-1 bg-white">
                        <AvatarImage src={activeRecipient.profileImg} className="rounded-full" />
                        <AvatarFallback className="bg-primary/10 text-primary font-black">
                          {activeRecipient.name.charAt(0)}
                        </AvatarFallback>
                       </Avatar>
                       <div className="absolute bottom-1 right-1 h-3.5 w-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-none mb-2">{activeRecipient.name}</h3>
                      <div className="flex items-center gap-2">
                         <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeRecipient.role} • Online</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-3">
                     <Button className="h-10 px-6 rounded-xl bg-slate-50 text-slate-400 font-bold hover:bg-slate-100 hover:text-slate-600 border-2 border-transparent transition cursor-pointer">Profile</Button>
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
              <div className="flex-1 flex flex-col items-center justify-center p-12 lg:p-24 text-center space-y-8 bg-slate-50/20">
                <div className="relative h-64 w-64 lg:h-80 lg:w-80 flex items-center justify-center drop-shadow-2xl">
                   <div className="absolute inset-0 bg-primary/10 rounded-[4rem] rotate-6 animate-pulse" />
                   <div className="absolute inset-0 bg-white rounded-[4rem] group hover:-rotate-3 transition-transform duration-700 p-12">
                      <div className="h-full w-full rounded-[3rem] bg-indigo-50/50 flex flex-col items-center justify-center space-y-6">
                        <Users className="text-primary/20 h-20 w-20" />
                        <div className="w-px h-12 bg-primary/10" />
                        <MessageSquare className="text-primary h-12 w-12" />
                      </div>
                   </div>
                </div>
                <div className="max-w-md space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tighter uppercase">Welcome to Chat</h2>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Select a conversation from the sidebar or start a new chat with one of the {currentUser?.role === 'student' ? 'instructors' : 'students'} to collaborate on your learning journey.
                  </p>
                  <Button 
                    onClick={() => setIsStartingNewChat(true)}
                    className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/30 cursor-pointer"
                  >
                    Find Mentor
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
