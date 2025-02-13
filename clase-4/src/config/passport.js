import passport from 'passport'
import local from 'passport-local'
import {validatePassword, hashPassword} from '../utils/bcrypt.js'
import userModel from '../models/users.models.js'

const localStrategy = local.Strategy //Defino la estrategia a implementar

const initializatePassword = () => {
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name, email, password, age} = req.body
            const newUser = await userModel.create({
                first_name : first_name, 
                last_name: last_name, 
                email: email, 
                password: hashPassword(password), 
                age: age
            })
            return done(null, newUser) //Se ejecuto correctamente y envio al usuario
        } catch (e) {
            return done(e)
        }
    }))

    passport.use('login', new localStrategy({usernameField: 'email'}, async (username, password, done) => {
        try {
    
            const user = await userModel.findOne({email:username})
        
            if(validatePassword(password, user?.password)) {
                return done(null, user)
            } else {
                return done(null, false) //No hubo ningun error pero no se logueo mi usuario
            }
    
        } catch (e) {
            return done(e)
        }
    }))

    //Pasos necesarios para generar una sesion y manejarnos via HTTP
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
} 

export default initializatePassword