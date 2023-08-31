import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products:[
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
       } 
    ]
})

export const cartsModel = mongoose.model('Carts',cartsSchema)