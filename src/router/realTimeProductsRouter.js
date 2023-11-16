import express from 'express'
import { promises as fs } from 'fs';
import path from "path";
import { __dirname } from "../utils.js";
import ioClient from 'socket.io-client';
const realTimeRouter = express.Router();

const io = ioClient();

export async function guardarProducto({
    title,
    price,
    description,
    code,
    stock,
    id
}) {
    try {
        const filePath = path.join(__dirname, "../products.json");
        const fileContent = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileContent);

        data.push({
            title: title,
            price: price,
            description: description,
            code: code,
            stock: stock,
            id: id
        });

        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
        
        console.log('Producto guardado exitosamente.');
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw error; 
    }
}

let products;

async function cargarProductos() {
    try {
        const contenido = await fs.readFile('products.json', 'utf-8');
        products = JSON.parse(contenido);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        products = [];
    }
}

cargarProductos();

realTimeRouter.get("/", (req, res) => {
    res.render("realTimeProducts", { products });
});

realTimeRouter.post('/', async(req, res) => {
    const { title, description, price, code, stock, id} = req.body;

    const newProduct = { title, description, price, code, stock , id};
    await guardarProducto(newProduct)

    io.emit('nuevoProductoAgregado', newProduct);

    res.redirect('/realTimeProducts');
});

export default realTimeRouter;