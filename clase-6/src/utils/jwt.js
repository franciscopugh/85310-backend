import jwt from 'jsonwebtoken'

let secretKey = "coder1234"

export const generateToken = (user) => {
    /*
        param1 = Objeto a almacenar (usuario)
        param2 = contraseña
        param3 = TTL o tiempo de vida
    */
   const token = jwt.sign({
    first_name: user.first_name,
    email: user.email,
    rol: user.rol
   }, secretKey, {expiresIn: '24h'})
   return token
} 