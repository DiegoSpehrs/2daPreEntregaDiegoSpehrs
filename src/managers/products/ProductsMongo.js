import {productsModels} from '../../db/models/porducts.model.js';

class ProductsMongo{
    async getProducts(limit,page,sort,query){
        try {
         const result = await productsModels.paginate(
          {limit,page,sort,query}
         )
         const info = {
           //status: ,//no se si hacerlo con un custom return o si hay un return de default que lo devuelve
           payload: result.docs,
           totalPages: result.totalPages,
           prevPage: result.prevPage,
           nextPage: result.nextPage,
           page: result.page,
           hasPrevPage: result.hasPrevPage,
           hasNextPage: result.hasNextPage,
           prevLink: `http://localhost:8080/api/products?page=${result.prevPageage}`,
           nextLink: `http://localhost:8080/api/products?page=${result.nextPageage}`
         }
         return {info}
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

    async getProductById(pid){
        try {
          const product = await productsModels.findById(pid)
          return product      
        } catch (error) {
          return error   
        }
    }

    async updateProduct(pid,obj){
        try {
          const response = await productsModels.updateOne({_id:pid},{...obj})
          return response  
        } catch (error) {
          return error   
        }
    }

    async deleteProduct(pid){
        try {
          const response = await productsModels.findByIdAndDelete(pid)
          return response  
        } catch (error) {
          return error  
        }
    }
}

export const productMongo = new ProductsMongo()