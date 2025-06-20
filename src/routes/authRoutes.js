const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/isUserLoggedIn', authController.isUserLoggedIn);
module.exports = router;