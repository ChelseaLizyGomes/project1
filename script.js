document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-tems');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    //Add to cart - item (to render the cart items properly)
    // When the add-to-cart button is clicked, it constructs an object (item) representing the item to be added to the cart.
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
           
            const item = {
                image: document.querySelectorAll('.card img')[index].src,
                
                name: document.querySelectorAll('.card .card--title')[index].textContent,
                
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(3),
                ),     
quantity:1,
 }; 


//quantity and total price 
const exisitingItem = cartItems.find(
    (cartItem) => cartItem.name === item.name,
);
if (exisitingItem) {
    exisitingItem.quantity++; //will increase the quantity if same item is added to cart
}
else {
    cartItems.push(item); //will push the new item thats added to cart 
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

      function updateCartItemCount(count) { // the total number of items in the cart
        cartItemCount.textContent = count;
       }
       
       function updateCartItemList(items = cartItems) {
        cartItemsList.innerHTML = '';
        items.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
            <div class='cart-item-display'>
            <div class='row-img'>
                <img class='rowimg' src=${item.image}>
            </div>
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">Rs.${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button></div>
            `;
            cartItemsList.appendChild(cartItem);
        });
    
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                removeItemFromCart(index);
            });

       /*function updateCartItemList(){
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
            });*/
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

document.getElementById("searchBar").addEventListener('input', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredItems = cartItems.filter((item) => {
        return item.name.toLowerCase().includes(searchData);
    });
    updateCartItemList(filteredItems);
});