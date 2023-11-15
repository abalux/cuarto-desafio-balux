import express from 'express'
import { promises as fs } from 'fs';
const productsRouter = express.Router();


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

productsRouter.get('/', (req, res) => {
    res.render('home', { products });
});


export default productsRouter