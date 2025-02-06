import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser("firmaSecreta"))
app.use(session({
    secret: "sesionSecreta",
    resave: true,
    saveUninitialized: true
}))


app.get('/setcookie', (req,res) => {
    res.status(200).cookie('CoderCookie', 'Esto es una cookie firmada', {maxAge:100000, signed:true}).send("Cookie generada")
})

app.get('/getcookie', (req,res) => {
    res.send(req.signedCookies) //Consulto solamente las cookies firmadas
})

app.get('/deletecookie', (req,res) => {
    res.clearCookie("CoderCookie").send("Cookie eliminada")
})

app.get('/session', (req,res) => {
    if(req.session.counter) {
        req.session.counter++
        res.send(`Usted ingreso ${req.session.counter} veces`)
    } else {
        req.session.counter = 1

        res.send("Bienvenido/a!")
    }
})

app.get('/logout', (req,res) => {
    req.session.destroy((e) => {
        if(e) {
            console.log(e);
            res.send("Error al cerrar sesion")
        } else {
            res.send("Session eliminada correctamente")
        }
    })
})

app.post('/login', (req,res) =>{
    const {email, password} = req.body

    if(email == "pepe@pepe.com" && password == "coder") {
        req.session.email = email
        req.session.admin = true
        return res.status(200).send("Usuario logueado correctamente")
    } else {
        return res.status(400).send("Error al iniciar session")
    }
})


const auth = (req,res,next) => {
    if(req.session.admin) {
        return next()
    }
    return res.status(403).send("Usuario no autorizado")
}

app.get('/admin', auth , (req,res) => {
    res.status(200).send("Estas en la ruta del admin!!")
})

app.listen(PORT, () => {
    console.log("Server on port:", PORT);
    
})
