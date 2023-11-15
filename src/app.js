import express from 'express'
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import productsRouter from './router/productRouter.js';
import { createServer } from "http";
import { __filename, __dirname } from "./utils.js";
import realTimeRouter from './router/realTimeProductsRouter.js'

const app = express();
const httpServer = createServer(app);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', productsRouter);
app.use('/realTimeProducts', realTimeRouter)

//te falta lo de instaurar socket

httpServer.listen(8080, () => {
    console.log(`Servidor en ejecución en http://localhost:8080`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("agregarProducto", (newProduct) => {
        console.log("Nuevo producto recibido backend:", newProduct);
        guardarProducto(newProduct);
        io.emit("nuevoProductoAgregado", newProduct);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});