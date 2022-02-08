import User from "../models/user.js";
import bcryptjs from 'bcryptjs';

const getUsers = async (all=false, id=undefined) => {
    if (!all && id) {
        return await User.findOne({ _id : id })
    } else {
        return await User.find()
    }
}

const validatePasswordCongruency = async (userSaysPasswordIs, encryptedPassword) => {
    return await bcryptjs.compare(userSaysPasswordIs, encryptedPassword) // true or false
}


export { getUsers, validatePasswordCongruency }; 