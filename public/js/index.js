const socket = io();

socket.emit("connect", "nuevo cliente conectado");

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
    const productList = document.getElementById("realTimeList");
    const li = document.createElement("li");
    li.textContent = newProduct.title;
    productList.appendChild(li);
    
})


socket.on("initialProductList", (productList) => {
    updateProductList(productList);
});  


function updateProductList(products) {
    const productList = document.getElementById("realTimeList");
    productList.innerHTML = "";

    products.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML = `

        <p>Id: ${product.id}</p>
        <p>Título: ${product.title}</p>
        <p>Descripción: ${product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Código: ${product.code}</p>
        <p>Stock: ${product.stock}</p>
        <button class="eliminarBtn" data-product-id="{{this.id}}">Eliminar</button>
    `;

    productList.appendChild(div);
    });

}