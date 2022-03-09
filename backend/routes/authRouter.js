const router = require('express').Router();
const authRouter = require('../controllers/authRouter');

router.post('/signup', authRouter.signUp);
router.post('/login', authRouter.login);
router.post('/logout', authRouter.logout);

module.exports = router;
