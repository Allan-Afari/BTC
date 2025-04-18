// Global variables
let cart = [];
const binanceAddress = '<%= binanceAddress %>';

// DOM Elements
const productsContainer = document.getElementById('products');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Fetch products from the server
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products on the page
function displayProducts(products) {
    productsContainer.innerHTML = products.map(product => `
        <div class="bg-white p-4 rounded-lg shadow">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4">
            <h3 class="text-xl font-bold">${product.name}</h3>
            <p class="text-gray-600">${product.description}</p>
            <p class="text-lg font-bold mt-2">${product.price} BTC</p>
            <button onclick="addToCart(${JSON.stringify(product)})" 
                    class="bg-black text-white px-4 py-2 rounded mt-4 w-full">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(product) {
    cart.push(product);
    updateCart();
    showCartModal();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center mb-2">
            <span>${item.name}</span>
            <span>${item.price} BTC</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    cartTotal.textContent = total.toFixed(8);
}

// Show/hide cart modal
function showCartModal() {
    cartModal.classList.remove('hidden');
}

function hideCartModal() {
    cartModal.classList.add('hidden');
}

// Handle checkout
checkoutBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart,
                total: cartTotal.textContent,
                address: binanceAddress
            })
        });
        
        const data = await response.json();
        if (data.success) {
            alert('Payment initiated! Please send the exact amount to the provided Bitcoin address.');
            cart = [];
            updateCart();
            hideCartModal();
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        alert('Error processing payment. Please try again.');
    }
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        hideCartModal();
    }
});

// Initialize the page
fetchProducts(); 