const socket = io();

socket.emit("connection", "nuevo cliente conectado");

document.getElementById("productForm").addEventListener('submit', (event) => {
    event.preventDefault();

    const productId = document.getElementById("productId").value;
    const productTitle = document.getElementById("productTitle").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCode = document.getElementById("productCode").value;
    const productStock = document.getElementById("productStock").value;

    console.log(
    "Nuevo producto agregado:",
        productId,
        productTitle,
        productDescription,
        productPrice,
        productCode,
        productStock,    
    );

    socket.emit("agregarProducto", {
        id:productId,
        title: productTitle,
        description: productDescription,
        price: productPrice,
        code:productCode,
        stock:productStock,
    });

    document.getElementById("productId").value = "";
    document.getElementById("productTitle").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCode").value = "";
    document.getElementById("productStock").value = "";

    location.reload();
})

socket.on("nuevoProductoAgregado", (newProduct) => {
    const productList = document.getElementById("productList");
    const li = document.createElement("li");
    li.textContent = newProduct.title;

    productList.appendChild(li);
});


