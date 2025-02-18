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

console.log(generateToken({"_id":{"$oid":"67b48e59af573af3fb3f8b0d"},"first_name":"Francisco","last_name":" ","email":"franciscopugh01@gmail.com","password":"$2b$06$OQ5YFSdcVdeqUmEQ.XXvw.VfeRJfLxR0NWwryPF1S1SUC.gG8X.t.","age":{"$numberInt":"18"},"rol":"Usuario","__v":{"$numberInt":"0"}}));
