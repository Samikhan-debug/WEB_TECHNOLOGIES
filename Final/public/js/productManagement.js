document.addEventListener('DOMContentLoaded', function() {
    fetchProducts(); // Fetch all products when the document is ready
    fetchFeaturedProducts(); // Fetch featured products when the document is ready
});

const addForm = document.getElementById('addProductForm');
const productList = document.getElementById('productList');
const featuredProductList = document.getElementById('featuredProductList');

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(addForm);
    const isFeatured = document.getElementById('isFeatured').checked;
    formData.append('isFeatured', isFeatured); // Correctly capture the state of the checkbox

    fetch('/api/products', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(product => {
        addProductToList(product);
        if (product.isFeatured) {
            fetchFeaturedProducts(); // Refresh the featured products section if necessary
        }
    })
    .catch(err => console.error('Error:', err));
});

function addProductToList(product) {
    const row = document.createElement('tr');
    let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" alt="${product.name}" style="max-width: 100px;">` : 'No image';
    row.innerHTML = `
        <td>${product._id}</td>
        <td>${imageDisplay}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td>${product.category}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Delete</button>
            <button class="btn btn-primary" onclick="showUpdateForm('${product._id}')">Update</button>
        </td>
    `;
    productList.appendChild(row);
}

function fetchProducts() {
    fetch('/api/products')
    .then(response => response.json())
    .then(data => {
        productList.innerHTML = ''; // Clear existing product entries
        data.products.forEach(addProductToList);
    })
    .catch(err => console.error('Error loading products:', err));
}

function fetchFeaturedProducts() {
    fetch('/api/products/featured')
    .then(response => response.json())
    .then(featuredProducts => {
        featuredProductList.innerHTML = ''; // Clear existing featured product entries
        featuredProducts.forEach(product => {
            const productCard = createProductCard(product);
            featuredProductList.appendChild(productCard);
        });
    })
    .catch(err => console.error('Error fetching featured products:', err));
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-4 card mb-4 shadow-sm';
    let imageDisplay = product.imageUrl ? `<img src="/${product.imageUrl}" class="card-img-top" alt="${product.name}" style="width:100%;">` : 'No image';
    card.innerHTML = `
        ${imageDisplay}
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <h6 class="card-subtitle mb-2 text-muted">$${product.price}</h6>
            <button class="btn btn-primary" onclick="addToCart('${product._id}')">Add to Cart</button>
        </div>
    `;
    return card;
}

window.deleteProduct = function(id) {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
    .then(() => {
        fetchProducts(); // Refresh the product list
        fetchFeaturedProducts(); // Refresh featured products in case the deleted product was featured
    })
    .catch(err => console.error('Error:', err));
};

window.showUpdateForm = function(id) {
    fetch(`/api/products/${id}`)
    .then(response => response.json())
    .then(product => {
        const form = document.getElementById('updateProductData');
        form.style.display = 'block'; // Show the update form
        document.getElementById('updateId').value = product._id;
        document.getElementById('updateName').value = product.name;
        document.getElementById('updatePrice').value = product.price;
        document.getElementById('updateDescription').value = product.description;
        document.getElementById('updateCategory').value = product.category;
    })
    .catch(error => console.error('Error:', error));
};

window.submitUpdate = function() {
    const form = document.getElementById('updateProductData');
    const formData = new FormData(form);
    const id = document.getElementById('updateId').value;

    fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        form.style.display = 'none'; // Hide the form again
        fetchProducts(); // Refresh the product list
        fetchFeaturedProducts(); // Refresh featured products in case the updated product is featured
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

window.addToCart = function(productId) {
    // Implementation for adding to cart (placeholder for now)
    alert(`Added product ${productId} to cart!`);
};
