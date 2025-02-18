import {generateToken} from '../utils/jwt.js'
export const login = async (req,res) => {
    try {
        if(!req.user) 
            return res.status(400).send("Usuario o contraseña no validos")
        
        //Sesion de BDD
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        } 
        //Retornar un token de JWT
        return res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false, //Evitar errores de https
            maxAge: 86400000 //Un dia en mls
        }).send("Usuario logueado correctamente")
    } catch (e) {
        return res.status(500).send(e)
    }
    
}

export const register = async (req,res) => {
    try {
        if(!req.user)
            return res.status(400).send("Email y contraseña son obligatorios")
        
        return res.status(201).send("Usuario registrado correctamente")
    } catch (e) {
        res.status(500).send(e)
    }
}

export const githubLogin = (req,res) => {
    try {
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        } 
        res.status(200).cookie('coderSession', generateToken(req.user), {
            httpOnly: true,
            secure: false, //Evitar errores de https
            maxAge: 86400000 //Un dia en mls
        }).send("Usuario logueado correctamente")
    } catch (e) {
        res.status(500).send(e)
    }
}