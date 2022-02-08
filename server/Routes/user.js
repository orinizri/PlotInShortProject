import express from "express";
import { userProfile, getAllUsers, deleteUser, updateUser, validateUserPassword, createNewUser, userLogin, userLogout, userLogoutAllSessions } from "../controllers/user.js";
import authentication from "./middleware/authentication.js";


const authRouter = express.Router()

authRouter.post('/users', createNewUser)
authRouter.post('/users/login', userLogin)
authRouter.post('/users/logout', authentication, userLogout)
authRouter.post('/users/logoutAll', authentication, userLogoutAllSessions)
authRouter.get('/users', getAllUsers)
authRouter.get('/users/me', authentication, userProfile)
authRouter.delete('/users/me', authentication, deleteUser)
authRouter.put('/users/me', authentication, updateUser)

authRouter.get('/validate/:id/:password', validateUserPassword)



export default authRouter;