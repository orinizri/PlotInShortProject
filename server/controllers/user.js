import User from "../models/user.js";
import { getUsers, validatePasswordCongruency } from '../services/index.js'


const createNewUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        const token = await user.generateAuthToken() // user is instance of User
        res.send({ user, token });
    } catch (e) {
        res.send(e);
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password); // User is the model
        const token = await user.generateAuthToken() // user is instance if User
        res.send({ user, token })
    } catch (e) {
        res.send({ error: e.message })
    }
}

const userLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save()
        res.send("User Logged out sucessfully")
    } catch (e) {
        res.send(e)
    }
}

const userLogoutAllSessions = async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e)
    }
}

const userProfile = async (req, res) => {
    res.send(req.user);
};

const getAllUsers = async (req, res) => {
    const allUsers = await getUsers(true);
    res.send(allUsers);
}

const deleteUser = async (req, res) => {
    try {
    await req.user.remove();
    res.send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
}

const updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password'];
        const areUpdatesValid = updates.every((update) => allowedUpdates.includes(update))
        if (!areUpdatesValid) {
        res.send({ error : 'invalid updates'})
        }
            updates.forEach(update => req.user[update] = req.body[update])
            await req.user.save()
            res.send(req.user)
    } catch (e) {
            res.status(500).send(e);
    }
}

const validateUserPassword = async (req, res) => {
    const { id, password } = req.params;
    const selectedUser = await getUsers(false, id);
    const isMatch = await validatePasswordCongruency(password, selectedUser.password);
    res.send({ password: isMatch });
}


export { getAllUsers, deleteUser, updateUser, validateUserPassword, createNewUser, userLogin, userProfile, userLogout, userLogoutAllSessions };