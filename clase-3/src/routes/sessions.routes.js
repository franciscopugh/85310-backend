import { Router } from "express";
import { login, register } from "../controllers/sessions.controllers.js";

const sessionsRouter = Router()

sessionsRouter.post('/register', register)
sessionsRouter.post('/login', login)

export default sessionsRouter