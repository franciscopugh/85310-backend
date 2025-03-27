import 'dotenv/config'
import nodemailer from 'nodemailer'
import __dirname from '../path.js'

export const sendMail = async (to, subject, html) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
            attachments: [
                {
                    filename: "perro1.jpg",
                    path: __dirname + '/img/perro1.jpg',
                    cid: "perrito1"
                },
                {
                    filename: "gato1.jpg",
                    path: __dirname + '/img/gato1.jpg',
                    cid: "gatito1"
                }
            ]
        }

        await transporter.sendMail(mailOptions)
        return {message: "Correo enviado correctamente"}
    
}
