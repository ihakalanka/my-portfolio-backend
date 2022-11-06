const app = require('express');
const router = app.Router();

const messageController = require('../controller/messageController');

router.post('/send-message', messageController.sendMessage);

module.exports = router;