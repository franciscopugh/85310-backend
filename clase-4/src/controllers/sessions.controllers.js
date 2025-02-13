export const login = async (req,res) => {
    try {
        if(!req.user) 
            return res.status(400).send("Usuario o contraseña no validos")

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol
        } 
            
        return res.status(200).send("Usuario logueado correctamente")
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