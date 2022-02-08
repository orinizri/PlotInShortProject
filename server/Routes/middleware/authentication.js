import jwt from "jsonwebtoken";
import User from "../../models/user.js";



const authentication = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'random')
        const user = await User.findOne({ _id : decoded._id , 'tokens.token' : token}) 
        console.log(decoded)
        if (!user) {
            throw new Error('not authorized')
        }
        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.send({nooo: e.message})
    }
}
export default authentication;