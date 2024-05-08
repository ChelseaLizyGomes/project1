/*Initialize mocked array to store products*/
let products = [
    { name: "cars", price: 20000 },
    { name: "vegetbles", price: 700 },
    { name: "fruits", price: 900 },
    { name: "dresses", price: 5000 },

    ];

 // let products = []  empty the product list if you want

// Initial displaying of products
displayProducts();

// Event listener for adding a product
document.getElementById("addProduct").addEventListener("click", addProduct);

// Function to render products
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - $${product.price}
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(li);

        console.log("Products", products);
    });
}

// Function to add a new product
function addProduct(event) {
    console.log("addProduct", event);

    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);

    if (productName && productPrice) {
        products.push({ name: productName, price: productPrice });
        displayProducts();
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
    } else {
        alert("Please enter both product name and price.");
    }

    console.log("Products", products);
}

// Function to edit a product
function editProduct(index) {
    const newProductName = prompt("Enter new product name:");
    const newProductPrice = parseFloat(prompt("Enter new product price:"));

    if (newProductName && newProductPrice) {
        products[index].name = newProductName;
        products[index].price = newProductPrice;
        displayProducts();
    } else {
        alert("Invalid input.");
    }
}

// Function to delete a product
function deleteProduct(index) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
        products.splice(index, 1);
        displayProducts();
    }
}



