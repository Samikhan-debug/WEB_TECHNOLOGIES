document.addEventListener('DOMContentLoaded', function() {
    fetchProducts(); // Initial call to load products
    fetchFeaturedProducts(); // Call to load featured products
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-4 card mb-4 shadow-sm';
    let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width:100%;">` : 'No image available';
    card.innerHTML = `
        ${imageDisplay}
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <h6 class="card-subtitle mb-2 text-muted">$${product.price}</h6>
            <button class="btn btn-primary" onclick="addToCart('${product._id}')">View It</button>
        </div>
    `;
    return card;
}


function createPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = 'btn btn-outline-primary mx-1';
        pageButton.onclick = () => {
            currentPage = i;
            fetchProducts();
        };
        pagination.appendChild(pageButton);
    }
}

function fetchProducts() {
    const currentPage = 1; // Example: Start on page 1
    const limit = 6; // Example: Limit items per page
    fetch(`/api/products?page=${currentPage}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear existing product cards
        data.products.forEach(product => {
            const productCard = createProductCard(product);
            productList.appendChild(productCard);
        });
        createPagination(data.totalPages);
    })
    .catch(error => console.error('Error fetching products:', error));
}

function fetchFeaturedProducts() {
    fetch('/api/products/featured')
    .then(response => response.json())
    .then(featuredProducts => {
        const featuredDiv = document.getElementById('featuredProducts');
        featuredDiv.innerHTML = ''; // Clear existing entries
        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredDiv.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error fetching featured products:', error));
}

window.addToCart = function(productId) {
    fetch(`/api/products/visit-product/${productId}`, { method: 'POST' })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product visited:', data);
        alert(`Added product ${productId} to visiting list`);
    })
    .catch(error => {
        console.error('Error adding product to visited list:', error);
    });
};
