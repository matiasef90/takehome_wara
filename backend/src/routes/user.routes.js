const express = require('express');
const router = express.Router();
const {
    createUser,
    login,
    deleteUser
} = require('../controller/user.controller');

router.post('/', createUser);
router.post('/login', login);
router.delete('/:id', deleteUser);

module.exports = router;