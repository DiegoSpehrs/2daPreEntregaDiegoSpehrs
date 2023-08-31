import { cartsModel } from "../../db/models/cart.model.js";

class CartsMongo {
    async getAllCarts(){
        try {
          const carts = await cartsModel.find({})  
        } catch (error) {
          return error  
        }
    }
    async getCartById(id){
        try {
          const cart = await CartModel.findById(id).populate('products',['title','price','thumbnail','code'])
          return cart  
        } catch (error) {
          return error   
        }
    }
    async createCart(obj){
        try {
          const cart = await CartModel.create(obj)  
          return cart 
        } catch (error) {
          return error   
        }
    }

    async cartDeleted(id){ 
        try {
          const response = await CartModel.findByIdAndDelete(id)
          return response  
        } catch (error) {
          return error  
        }
    }

    async cartUpdate(id,obj){
        try {
          const response = await cartsModel.updateOne({_id:id},{...obj})
          return response  
        } catch (error) {
          return error  
        }
    }
}

export const cartMongo = new CartsMongo()

