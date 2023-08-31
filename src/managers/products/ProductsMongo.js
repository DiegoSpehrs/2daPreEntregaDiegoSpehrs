import {productsModels} from '../../db/models/porducts.model.js';

class ProductsMongo{
    async getProducts(){
        try {
          const products = await productsModels.find({})
          return products  
        } catch (error) {
          return error
        }
    }

    async addproduct(obj){
        try {
          const newProduct = await productsModels.create(obj)
          return newProduct  
        } catch (error) {
          return error  
        }
    }

    async getProductById(id){
        try {
          const product = await productsModels.findById(id)
          return product      
        } catch (error) {
          return error   
        }
    }

    async updateProduct(id,obj){
        try {
          const response = await productsModels.updateOne({_id:id},{...obj})
          return response  
        } catch (error) {
          return error   
        }
    }

    async deleteProduct(id){
        try {
          const response = await productsModels.findByIdAndDelete(id)
          return response  
        } catch (error) {
          return error  
        }
    }
}

export const productMongo = new ProductsMongo()