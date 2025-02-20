import { model, Schema } from "mongoose";
import cartModel from './carts.models.js'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "Usuario"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }
})

userSchema.post("save", async function name(userCreated) {
    try {
        const newCart = await cartModel.create({products: []}) //Creo un nueevo carrito
        await model("users").findByIdAndUpdate(userCreated._id, { //Actualizo la prop cart del usuario creado anteriormente
            cart: newCart._id
        })
    } catch (e) {
        console.log(e);
    }
})

const userModel = model("users", userSchema)

export default userModel