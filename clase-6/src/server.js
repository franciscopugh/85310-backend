import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import path from 'path'
import passport from 'passport'
import { create } from 'express-handlebars'
import initializatePassword from './config/passport.js'
import usersRouter from './routes/users.routes.js'
import sessionsRouter from './routes/sessions.routes.js'
import cartsRouter from './routes/carts.routes.js'
import productRouter from './routes/products.routes.js'
import __dirname from './path.js'

const app = express()
const PORT = 8080
const hbs = create()

app.use(express.json())
app.use(cookieParser("firmaSecreta"))
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://franciscopugh01:@cluster0.jdow0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 60
    }),
    secret: "sesionSecreta",
    resave: true,
    saveUninitialized: true
}))

mongoose.connect("mongodb+srv://franciscopugh01:@cluster0.jdow0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))
.catch((e) => console.log(e))
console.log(__dirname);

initializatePassword()
app.use(passport.initialize())
app.use(passport.session())
//Configuracion para trabajar con hbs
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, "views"))
//Configuracion de archivos publicos
app.use(express.static(path.join(__dirname, "public")))
console.log(path.join(__dirname, "views"))
//Rutas
app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productRouter)

app.listen(PORT, () => {
    console.log("Server on port:", PORT);
    
})
