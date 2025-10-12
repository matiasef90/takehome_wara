const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUser);

module.exports = router;