const products = [
    {
        id: 1,
        name: "فستان مرجع اسود انيق AIK5066",
        price: 429.99,
        image: "assets/products/bright-black.jpg",
        rating: 4.5,
        reviews: 320,
        description: "فستان سهرة أنيق باللون الأسود مع تصميم مميز. قماش عالي الجودة وتفاصيل دقيقة.",
    },
    {
        id: 2,
        name: "فستان مرجع ازرق غامق",
        price: 39.99,
        image: "assets/products/deep-blue.jpeg",
        rating: 4.3,
        reviews: 210,
        description: "فستان أزرق غامق بتصميم عصري. مناسب للمناسبات الخاصة والحفلات.",
    },
    {
        id: 3,
        name: "فستان مرجع لون رمادي",
        price: 129.99,
        image: "assets/products/gray.jpg",
        rating: 4.7,
        reviews: 178,
        description: "فستان بلون رمادي أنيق مناسب للسهرات والمناسبات الرسمية.",
    },
    {
        id: 4,
        name: "فستان مرجع لون فضي",
        price: 59.99,
        image: "assets/products/silver.jpg",
        rating: 4.6,
        reviews: 342,
        description: "فستان فضي لامع مثالي للحفلات والمناسبات الخاصة.",
    },
    {
        id: 5,
        name: "فستان اخضر",
        price: 139.99,
        image: "assets/products/gray.jpg",
        rating: 4.4,
        reviews: 412,
        description: "فستان أخضر كلاسيكي بتصميم أنيق وقصة مميزة.",
    },
    {
        id: 6,
        name: "فستان اسود",
        price: 39.99,
        image: "assets/products/bright-red.jpg",
        rating: 4.8,
        reviews: 992,
        description: "فستان أسود كلاسيكي أنيق مناسب لجميع المناسبات.",
    },
    {
        id: 7,
        name: "فستان ازرق فاتح",
        price: 5000.0,
        image: "assets/products/bright-red_black.jpg",
        rating: 4.2,
        reviews: 272,
        description: "فستان بلون أزرق فاتح بتصميم عصري وقماش مريح.",
    },
    {
        id: 8,
        name: "فستان ازرق فاتح",
        price: 5000.0,
        image: "assets/products/bright-red.jpg",
        rating: 4.2,
        reviews: 27772,
        description: "فستان بلون أزرق فاتح آخر بتصميم عصري وقماش مريح.",
    },
];

// DOM Elements
const productDetail = document.getElementById("productDetail");

// Cart data
let cart = [];

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Find product
    const product = products.find((p) => p.id === productId);

    if (product) {
        displayProductDetails(product);
    } else {
        productDetail.innerHTML = "<p>Product not found</p>";
    }
});

// Display product details
function displayProductDetails(product) {
    const stars = generateStarRating(product.rating);

    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <div class="price">$${product.price.toFixed(2)}</div>
        <div class="rating">${stars}</div>
        <div class="reviews">${product.reviews} reviews</div>
        <div class="description">${product.description}</div>
        <div class="product-actions">
            <button class="button buy" data-id="${product.id}">Add to Cart</button>
            <button class="button favourite" data-id="${product.id}">Add to Favorites</button>
        </div>
    `;

    // Add event listeners
    const buyButton = productDetail.querySelector(".buy");
    buyButton.addEventListener("click", () => addToCart(product));

    const favoriteButton = productDetail.querySelector(".favourite");
    favoriteButton.addEventListener("click", () => toggleFavorite(favoriteButton, product.id));
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHTML = "";
    for (let i = 0; i < fullStars; i++) {
        starsHTML += "★";
    }
    if (halfStar) {
        starsHTML += "★";
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += "☆";
    }
    return starsHTML;
}

// Add product to cart
function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showNotification(`${product.name} added to cart!`);
}

// Toggle favorite status
function toggleFavorite(button, productId) {
    button.classList.toggle("active");
    showNotification(
        button.classList.contains("active")
            ? "Added to favorites!"
            : "Removed from favorites!"
    );
}

// Show notification
function showNotification(message) {
    let notification = document.querySelector(".cart-notification");
    if (!notification) {
        notification = document.createElement("div");
        notification.className = "cart-notification";
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.classList.add("visible");
    setTimeout(() => {
        notification.classList.remove("visible");
    }, 3000);
}