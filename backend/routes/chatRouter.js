const router = require('express').Router();
const chatRouter = require('../controllers/chatRouter');

router.get('/chats', chatRouter.getChats);
router.get('/users', chatRouter.getUsers);

module.exports = router;

