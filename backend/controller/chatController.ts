import asyncHandler from 'express-async-handler';
import Conversation from '../model/conversationModel';
import Message from '../model/messageModel';
import User from '../model/userModel';
import ApiError from '../utils/apiError';
import { Types } from 'mongoose';

// @desc    Get all conversations for current user
// @route   GET /api/v1/chats/conversations
// @access  Protected
export const getConversations = asyncHandler(async (req, res) => {
  const userId = (req.user as any)._id as Types.ObjectId;

  const conversations = await Conversation.find({
    participants: { $in: [userId] }
  })
    .populate('participants', 'name profileImg role')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

  res.status(200).json({ status: 'success', data: conversations });
});

// @desc    Get messages for a conversation
// @route   GET /api/v1/chats/:conversationId
// @access  Protected
export const getMessages = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;
  const userId = (req.user as any)._id as Types.ObjectId;

  // Check if user is part of this conversation
  const conv = await Conversation.findOne({
    _id: conversationId,
    participants: { $in: [userId] }
  });

  if (!conv) {
    return next(new ApiError('Conversation not found or access denied', 404));
  }

  const messages = await Message.find({ conversation: conversationId as any })
    .populate('sender', 'name profileImg')
    .sort({ createdAt: 1 });

  res.status(200).json({ status: 'success', data: messages });
});

// @desc    Send a message
// @route   POST /api/v1/chats/send
// @access  Protected
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { recipientId, content, conversationId } = req.body;
  const userId = (req.user as any)._id as Types.ObjectId;

  let convId = conversationId;

  // If no conversationId, check if it already exists or create new
  if (!convId) {
    const existingConv = await Conversation.findOne({
      participants: { $all: [userId, recipientId] }
    });

    if (existingConv) {
      convId = existingConv._id;
    } else {
      const newConv = await Conversation.create({
        participants: [userId, recipientId]
      });
      convId = newConv._id;
    }
  }

  const message = await Message.create({
    conversation: convId,
    sender: userId,
    content
  });

  // Update last message in conversation
  await Conversation.findByIdAndUpdate(convId, {
    lastMessage: message._id
  });

  res.status(201).json({ status: 'success', data: message });
});

// @desc    Search for users to start chat (Instructors for students, Students for instructors)
// @route   GET /api/v1/chats/users
// @access  Protected
export const getAvailableUsers = asyncHandler(async (req, res) => {
  const userId = (req.user as any)._id as Types.ObjectId;
  const roleToFind = (req.user as any).role === 'student' ? 'instructor' : 'student';
  
  const users = await User.find({ 
    role: roleToFind,
    _id: { $ne: userId } 
  }).select('name role profileImg email');

  res.status(200).json({ status: 'success', data: users });
});
