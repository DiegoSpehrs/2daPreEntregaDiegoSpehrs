import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    name:{
        type:'string',
        required: true
    },
    descripton:{
        type:'string',
        required: true
    },
    products:[
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
       } 
    ]
})

export const cartsModel = mongoose.model('Carts',cartsSchema)