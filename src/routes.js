import { Router } from "express";
import UserController from "./controllers/UserController.js";
import SessionController from "./controllers/SessionController.js";
import ListaController from './controllers/ListaController.js';
import auth from './middlewares/auth.js';
import RefreshController from "./controllers/RefreshController.js";

const router = Router();

// Usuários
router.post('/createusers', UserController.createUser);
router.get('/listusers', auth, UserController.findAllUser);
router.get('/listusers/:id', auth, UserController.findUser);

// Sessão de usuários
router.post('/session', SessionController.createSession);

//Refresh
router.post('/refresh', RefreshController.refreshSession); 

// Tarefas
router.post('/createtask', auth, ListaController.createTask);
router.get('/listtask', auth, ListaController.listTaskAll);
router.get('/listtask/:id', auth, ListaController.findListTask);
router.put('/taskupdate/:id', auth, ListaController.updateTask);
router.delete('/taskdelete/:id', auth, ListaController.deleteTask);

export default router;
