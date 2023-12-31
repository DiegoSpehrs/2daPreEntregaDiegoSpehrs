import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import { productMongo } from './managers/products/ProductsMongo.js';
import './db/dbConfig.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(express.static(__dirname+'/public'))

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use('/api/products',productsRouter)
app.use('/api/cart',cartsRouter)
app.use('/api/views',viewsRouter)

const PORT = 8080

const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on('addProduct',async(newProduct)=>{ 
        try{
            const addProduct = await productMongo.addproduct(
                newProduct.title,
                newProduct.description,
                newProduct.price,
                newProduct.thumbnai,
                newProduct.code,
                newProduct.stock,
                newProduct.id                
            );
            socketServer.emit("addProductSuccess", addProduct);
        }catch(error){
            socket.emit('errorAddProd',"error al agregar el producto")
        }  
    })

    socket.on('deletPorduct',async(idProduct)=>{
        try{
            const producDeleted = await productMongo.deleteProduct(idProduct)
            socketServer.emit("deleteProductSuccess", producDeleted);
        }catch(error){
            socket.emit('errorDeletedProd',"error al eliminar el producto")
        }
       
    })

    socket.on('disconnect',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })

})

