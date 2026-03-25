import express from 'express';
import { 
  getConversations, 
  getMessages, 
  sendMessage, 
  getAvailableUsers 
} from '../controller/chatController';
import { protect } from '../controller/authController';

const router = express.Router();

router.use(protect); // All chat routes need protection

router.get('/conversations', getConversations);
router.get('/users', getAvailableUsers);
router.get('/:conversationId', getMessages);
router.post('/send', sendMessage);

export default router;
