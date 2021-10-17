const User = require('../models/user');
const jwt = require('jsonwebtoken');

async function create(req, res) {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(400).json({message: 'One of the parameters is incorrect'})
    }
};

async function getAllUsers(req, res) {
    const users = await User.find({});
    res.send(users);
}

async function isAvailable(req, res) {
    const {username} = req.body;
    const isExist = await User.findOne({username})
    res.send(!isExist)
}

async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(403).send({message: 'One or more of the parameters is missing'});
    }
    const userExist = await User.findOne({username, password});
    if(!userExist) {
        res.status(403).send({message: 'One of the parameters is incorrect'});
    }
    console.log(userExist._id);
    const token = jwt.sign({ id: userExist._id }, 'shahar');
    console.log(token);

    res.json({ token });
}

async function deleteUser(req, res) {
    console.log("here");
    console.log(req.params.userId);
    User.findByIdAndRemove({ _id: req.params.userId });
    res.status(200).send();
}

module.exports = {
    create,
    login,
    getAllUsers,
    isAvailable,
    deleteUser
};