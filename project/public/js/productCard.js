document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('productList');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    const limit = 6;

    // Retrieve cart from session storage or initialize an empty object
    let cart = JSON.parse(sessionStorage.getItem('cart')) || {};

    // Adds a product to the cart
    window.addToCart = function(productId) {
        if (cart[productId]) {
            cart[productId]++;
        } else {
            cart[productId] = 1;
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart!');
    };

    window.removeFromCart = function(productId) {
        if (cart[productId]) {
            if (cart[productId] > 1) {
                cart[productId]--;
            } else {
                delete cart[productId];
            }
            sessionStorage.setItem('cart', JSON.stringify(cart));
            alert('Product removed from cart!');
            // Refresh the cart display by re-rendering the cart items
            displayCart();
        }
    };

    // Function to create each product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" alt="${product.name}" class="card-img-top">` : 'No image';
        
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                ${imageDisplay}
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <h6 class="card-subtitle mb-2 text-muted">$${product.price}</h6>
                    <button class="btn btn-primary add-to-cart" onclick="addToCart('${product._id}')">Add to Cart</button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    }

    // Function to fetch products based on current page
    function fetchProducts() {
        fetch(`/api/products?page=${currentPage}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = '';
            data.products.forEach(createProductCard);
            createPagination(data.totalPages);
        })
        .catch(error => console.error('Error fetching products:', error));
    }

    // Initial fetch of products
    fetchProducts();
});
