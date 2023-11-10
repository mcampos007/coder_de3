import express from "express";
import ProductManager from "./ProductManager.js";
const app = express();
app.use(express.urlencoded({extended:true}));

/* 
const pm = new ProductManager(lcPath);

const productos = pm.getProducts();
console.log(productos); */

app.get('/products', async (req, res) => {
    try{
        let limit = req.query.limit;
        console.log(limit);
        const lcPath = "./productos.json";
        const MisProductos = new ProductManager(lcPath);
        const Productos = await MisProductos.getProducts();
        if (!limit){
            return res.send(Productos);
        }
        const ProductosLimitados = Productos.slice(0, limit);
        res.send(ProductosLimitados);
        
        
    }catch(error){
        console.log(error);
        res.send({error: error});
    }
    
})

app.get('/products/:pid', async (req, res) =>{
    try{
        let id = parseInt(req.params.pid);
        const lcPath = "./productos.json";
        const MisProductos = new ProductManager(lcPath);
        const miProducto = await MisProductos.getProductById(id);
        if (!miProducto){
            return res.send({error:"El Producto No Existe"});
        }
        res.send(miProducto);
    }catch(error){

    }
});

const PORT= 8080
app.listen(PORT, () => console.log('Servidor online en puerto:' + PORT ));



