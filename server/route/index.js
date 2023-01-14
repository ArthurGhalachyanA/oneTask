const Router = require('express').Router;
const router = new Router();

const userController = require('../controllers/userController');
const keywordController = require('../controllers/keywordController');
const rssController = require('../controllers/rssController');

const authMiddleware = require('../middlewares/authMiddleware');
const {signUpBody} = require('../models/bodyValidation/userBody');
const {keywordCreateUpdateBody} = require('../models/bodyValidation/keywordBody');

router.post('/sign-up', signUpBody, userController.signUp);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);

router.post('/logout', authMiddleware, userController.logout);


router.get('/rss', authMiddleware, rssController.getRss);





router.get('/keyword', authMiddleware, keywordController.getKeywordById);
router.get('/keywords', authMiddleware, keywordController.getKeywords);
router.put('/keywords', [authMiddleware, keywordCreateUpdateBody], keywordController.updateKeyword);
router.post('/keywords', [authMiddleware, keywordCreateUpdateBody], keywordController.createKeyword);
router.delete('/keywords', authMiddleware, keywordController.deleteKeyword);

module.exports = router;