const express = require('express');
const router = express.Router();
const {
    createUserController,
    loginController,
    getUserByEmail,
    createUser,
} = require('../controller/user.controller');

router.post('/register', createUserController({getUserByEmail, createUser}));
router.post('/login', loginController({getUserByEmail}));

module.exports = router;