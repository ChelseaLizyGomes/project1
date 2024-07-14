document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-tems');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;

    // function to show the notification (when item added to cart)
    function showNotification() {
        var notificationBox = document.getElementById("notificationBox");
        var notificationText = document.getElementById("notificationText");

        notificationText.textContent = 'Item Added to cart!';
        notificationBox.style.display = 'block';

        // Hide the notification after a delay (e.g., 1 second)
        setTimeout(function () {
            notificationBox.style.display = 'none';
        }, 1000); // Adjust the delay as needed
    }

    //Add to cart - item (to render the cart items properly)
    // When the add-to-cart button is clicked, it constructs an object (item) representing the item to be added to the cart.
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {

            const item = {
                image: document.querySelectorAll('.card img')[index].src,
                name: document.querySelectorAll('.card .card--title')[index].textContent,
                price: parseFloat(
                    document.querySelectorAll('.price')[index].textContent.slice(3)),
                size: document.querySelector('input[name="size"]:checked').value,
                quantity: parseInt(document.getElementById('quantity').value),
            };

            showNotification()

            //quantity and total price 
            const existingItem = cartItems.find((cartItem) => cartItem.name === item.name && cartItem.size === item.size,);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cartItems.push(item);
            }
            totalAmount += item.price * item.quantity;

            updateCartUI();
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) { // the total number of items in the cart
        cartItemCount.textContent = count;
    }

    function updateCartItemList(items = cartItems) {
        // Clear the existing content of cartItemsList
        cartItemsList.innerHTML = '';

        items.forEach((item, index) => { // Iterate over each item in the items array

            const cartItem = document.createElement('div'); // Create a new div element for each item
            cartItem.classList.add('cart-item', 'individual-cart-item');

            // Set the innerHTML of the cartItem div using a template literal
            cartItem.innerHTML = `
            <div class='cart-item-display'>
            <div class='row-img'>
                <img class='rowimg' src=${item.image}>
            </div>
                <span>(${item.quantity}x) ${item.name}</span>
                <span>(${item.size})</span>
                <span class="cart-item-price">Rs.${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button> 
                </div>`;

            // Append the created cartItem div to cartItemsList
            cartItemsList.appendChild(cartItem);
        });
       
        
        //JSOn
                // Add event listeners to remove-item buttons
               /* document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const index = e.target.closest('.remove-item').dataset.index;
                        totalAmount -= cartItems[index].price * cartItems[index].quantity;
                        cartItems.splice(index, 1);
                        
                        updateCartUI();
                    });
                });
            }*/
        


        //Eventlistener to remove item 
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const index = parseInt(event.target.dataset.index); // Parse the index as integer

                console.log("Index to remove:", index);

                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removeItem = cartItems.splice(index,1)[0];
        totalAmount -= removeItem.price * removeItem.quantity;

        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `Rs.${totalAmount.toFixed(2)}`; 

    }
    //Eventlistener to open cart
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    //Eventlistener to close cart /sidebar
    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});

//Eventlistener for searchbar to filter products
/*/document.getElementById("searchBar").addEventListener('input', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredItems = cartItems.filter((item) => {
        return item.name.toLowerCase().includes(searchData);
    });
    updateCartItemList(filteredItems);
});*/

// Search functionality
document.getElementById("searchBar").addEventListener('input', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredItems = cartItems.filter(item => item.name.toLowerCase().includes(searchData));

    updateCartItemList(filteredItems);
});
