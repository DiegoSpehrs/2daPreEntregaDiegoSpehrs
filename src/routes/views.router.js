import { Router } from "express";
import  {productMongo}  from "../managers/products/ProductsMongo.js";


const router = Router()




router.get('/',async(req,res) =>{
    const allProducts = await productMongo.getProduct();
    res.render("bodyHome",{ products: allProducts })
})

router.get('/realtimeproducts',async(req,res)=>{    
    const allProducts = await productMongo.getProduct();
    res.render("realTimeProducts",{ products: allProducts })
})




export default router