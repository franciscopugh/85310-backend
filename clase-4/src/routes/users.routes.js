import { Router } from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controllers.js";

const usersRouter =  Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:uid', getUser)
usersRouter.post('/', createUser)
usersRouter.put('/:uid', updateUser)
usersRouter.delete('/:uid', deleteUser)

export default usersRouter