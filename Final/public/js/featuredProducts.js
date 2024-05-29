document.addEventListener('DOMContentLoaded', function() {
    fetchFeaturedProducts(); // Fetch and display featured products when the document is ready
});

function fetchFeaturedProducts() {
    fetch('/api/products/featured')
        .then(response => response.json())
        .then(featuredProducts => {
            const featuredDiv = document.getElementById('featuredProductList');
            featuredDiv.innerHTML = '';
            if (featuredProducts && featuredProducts.length > 0) {
                featuredProducts.forEach(product => {
                    const productCard = createProductCard(product);
                    featuredDiv.appendChild(productCard);
                });
            } else {
                featuredDiv.innerHTML = '<p>No featured products available.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching featured products:', error);
            document.getElementById('featuredProductList').innerHTML = '<p>Error loading featured products.</p>';
        });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-4 card mb-4 shadow-sm';
    let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width:100%;">` : '<p>No image available</p>';
    card.innerHTML = `
        ${imageDisplay}
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <h6 class="card-subtitle mb-2 text-muted">$${product.price}</h6>
            <button class="btn btn-primary" onclick="addToCart('${product._id}')">View IT</button>
        </div>
    `;
    return card;
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
        alert(`Added product ${productId} to visited list!`);
    })
    .catch(error => {
        console.error('Error adding product to visited list:', error);
    });
};
