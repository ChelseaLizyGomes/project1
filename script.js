document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-tems');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
           
            const item = {
                name: document.querySelectorAll('.card .card--title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(1),
                ),
                
quantity:1,

 };

const exisitingItem = cartItems.find(
    (cartItem) => cartItem.name === item.name,
);
if (exisitingItem) {
    exisitingItem.quantity++;
}
else {
    cartItems.push(item);
}
totalAmount += item.price;

updateCartUI();

    });
});
       function updateCartUI()  {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
       }  

       function updateCartItemCount(count) {
        cartItemCount.textContent = count;
       }

       function updateCartItemList(){
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item','individual-cart-item');
            cartItem.innerHTML = `
            <span> (${item.quantity}x)${item.name} </span>
            <span class="cart-item-price">Rs.${(
                item.price * item.quantity
            ).toFixed(2)}
            <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button> 
            </span>
            `;
            
            cartItemsList.appendChild(cartItem);
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });
        });
       }
         
       function removeItemFromCart(index) {
        const removeItem = cartItems.splice(index, 1)[0];
totalAmount -= removeItem.price * removeItem.quantity;
updateCartUI();
       }

       function updateCartTotal () {
        cartTotal.textContent = `Rs.${totalAmount.toFixed(2)}`;

       }
       cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
       });

       const closeButton = document.querySelector('.sidebar-close');
closeButton.addEventListener('click', () =>{
sidebar.classList.remove('open');  
 });
});









/*Initialize mocked array to store products
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
}*/ 
