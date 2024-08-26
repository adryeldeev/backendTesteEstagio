import { Router } from "express";
import UserController from "./controllers/UserController.js";
import SessionController from "./controllers/SessionController.js";
import auth from './middlewares/auth.js'

const router = Router()
//Usúarios
router.post('/createusers',UserController.createUser)
router.get('/listusers',auth,UserController.findAllUser)
router.get('/listusers/:id',auth,UserController.findUser)

//session usuarios
router.post('/session', SessionController.createSession)

export default router