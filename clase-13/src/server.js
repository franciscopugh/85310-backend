import express from 'express'
import { sendMail } from './utils/nodemailer.js'
const app = express()
const PORT = 8080

app.use(express.json())

app.get('/enviarmail', async (req,res) => {
    try {
        const message = await sendMail("franciscopugh3@gmail.com", "Test Nodemailer", 
            `
                <div>
                    <h1>Texto de prueba</h1>
                    <p> Holaaaaaaaaaaa! </p>
                    <img src="cid:gatito1"/>
                </div>
            `)
        res.status(200).send(message)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`); 
})