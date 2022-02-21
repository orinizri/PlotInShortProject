import express from "express";
import { userProfile, getAllUsers, deleteUser, updateUser, validateUserPassword, createNewUser, userLogin, userLogout, userLogoutAllSessions } from "../controllers/user.js";
import authentication from "./middleware/authentication.js";


const authRouter = express.Router()

authRouter.post('/', createNewUser)
authRouter.post('/login', userLogin)
authRouter.post('/logout', authentication, userLogout)
authRouter.post('/logoutAll', authentication, userLogoutAllSessions)
authRouter.get('/', getAllUsers)
authRouter.get('/me', authentication, userProfile)
authRouter.delete('/me', authentication, deleteUser)
authRouter.put('/me', authentication, updateUser)

authRouter.get('/validate/:id/:password', validateUserPassword)



export default authRouter;