const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    try {
        jwt.verify(token, 'shahar');
        next();
    } catch (err) {
        console.log(err)
        res.status(403).send('not nice');
    }
};

router.post('/user', usersController.create);

router.get('/get', usersController.getAllUsers);

router.post('/user/available', usersController.isAvailable);

router.post('/login', usersController.login);

router.get('/health', auth, (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

router.delete('/user/:userId', usersController.deleteUser)

module.exports = router;