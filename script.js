document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-tems');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');

    let cartItems = [];
    let totalAmount = 0;

    // Listen for messages from product.html to add item to cart
    window.addEventListener('message', event => {
        const { action, item } = event.data;
        if (action === 'add-to-cart') {
            const existingItem = cartItems.find(cartItem =>
                cartItem.name === item.name && cartItem.size === item.size
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cartItems.push(item);
            }
            totalAmount += item.price * item.quantity;

            updateCartUI();
            showNotification();
        }
    });

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

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const item = {
                id: parseInt(button.getAttribute('data-id')),
                name: document.querySelectorAll('.card .card--title')[index].textContent,
                price: parseFloat(document.querySelectorAll('.price')[index].textContent.slice(3)),
                size: document.querySelector('input[name="size"]:checked').value,
                quantity: parseInt(document.getElementById('quantity').value),
                imageUrl: document.querySelectorAll('.card img')[index].src
            };

            // Simulate adding to cart for demonstration
            window.parent.postMessage({ action: 'add-to-cart', item: item }, '*');
        });
    });

    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <div class='cart-item-display'>
                    <div class='row-img'>
                        <img class='rowimg' src=${item.imageUrl}>
                    </div>
                    <span>(${item.quantity}x) ${item.name}</span>
                    <span>(${item.size})</span>
                    <span class="cart-item-price">Rs.${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="remove-item" data-index="${index}"><i class="fa-solid fa-times"></i></button> 
                </div>
            `;
            cartItemsList.appendChild(cartItem);

            // Event listener to remove item
            const removeButton = cartItem.querySelector('.remove-item');
            removeButton.addEventListener('click', () => {
                removeItemFromCart(index);
            });
        });
    }

    function removeItemFromCart(index) {
        const removedItem = cartItems.splice(index, 1)[0];
        totalAmount -= removedItem.price * removedItem.quantity;

        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `Rs.${totalAmount.toFixed(2)}`;
    }

    // Event listener to open cart
    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Event listener to close cart / sidebar
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    //Eventlistener for searchbar to filter products
document.getElementById("searchBar").addEventListener('input', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredItems = cartItems.filter(item => item.name.toLowerCase().includes(searchData));
    updateCartItemList(filteredItems);
});

});

