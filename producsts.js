const products = [
  {
    id: 1,
    name: "فستان مرجع اسود انيق AIK5066",
    price: 429.99,
    image: "assets/products/bright-black.jpg",
    rating: 4.5,
    reviews: 320,
    description:
      "فستان سهرة أنيق باللون الأسود مع تصميم مميز. قماش عالي الجودة وتفاصيل دقيقة.",
  },
  {
    id: 2,
    name: "فستان مرجع ازرق غامق",
    price: 39.99,
    image: "assets/products/deep-blue.jpeg",
    rating: 4.3,
    reviews: 210,
    description:
      "فستان أزرق غامق بتصميم عصري. مناسب للمناسبات الخاصة والحفلات.",
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
  {
    id: 8,
    name: "فستان ازرق فاتح",
    price: 5000.0,
    image: "assets/products/bright-red.jpg",
    rating: 4.2,
    reviews: 27772,
    description: "فستان بلون أزرق فاتح آخر بتصميم عصري وقماش مريح.",
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
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cartBtn = document.getElementById("cartBtn");
const cartContainer = document.getElementById("cartContainer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const overlay = document.getElementById("overlay");

// Cart data
let cart = [];

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Load cart from localStorage if available
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  displayProducts(products);
  setupEventListeners();
});

// Display products in the grid
function displayProducts(productsToDisplay) {
  productGrid.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

function showProductDetails(productId) {
  window.location.href = `item-product.html?id=${productId}`;
}

// Toggle favorite status of a product
// function toggleFavorite(button, productId) {
//     button.classList.toggle("active");
//     console.log(`Product ${productId} favorite status toggled`);
//     showNotification(
//         button.classList.contains("active")
//             ? "Added to favorites!"
//             : "Removed from favorites!"
//     );
// }

function toggleFavorite(button, productId) {
  button.classList.toggle("active");

  // Get current favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (button.classList.contains("active")) {
    // Add to favorites if not already there
    if (!favorites.includes(productId)) {
      favorites.push(productId);
    }
  } else {
    // Remove from favorites
    favorites = favorites.filter((id) => id !== productId);
  }

  // Save back to localStorage
  localStorage.setItem("favourites", JSON.stringify(favorites));

  console.log(`Product ${productId} favorite status toggled`);
  showNotification(
    button.classList.contains("active")
      ? "Added to favorites!"
      : "Removed from favorites!"
  );
  // Save cart to localStorage before navigating
  // Navigate to checkout page
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  // Generate star rating HTML
  const stars = generateStarRating(product.rating);

  card.innerHTML = `
          <img src="${product.image}" alt="${
    product.name
  }" onclick="showProductDetails(${product.id})">
          <h3 onclick="showProductDetails(${product.id})">${product.name}</h3>
          <div class="price">$${product.price.toFixed(2)}</div>
          <div class="rating">${stars}</div>
          <div class="reviews">${product.reviews} reviews</div>
          <div class="product-actions">
              <button class="button favourite" data-id="${
                product.id
              }">❤</button>
              <button class="button buy" data-id="${
                product.id
              }">Buy Now</button>
          </div>
          `;

  // Add event listeners for buttons
  const buyButton = card.querySelector(".buy");
  buyButton.addEventListener("click", () => addToCart(product));

  const favoriteButton = card.querySelector(".favourite");
  favoriteButton.addEventListener("click", (e) =>
    toggleFavorite(e.target, product.id)
  );

  return card;
}

// Generate star rating HTML based on rating value
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let starsHTML = "";

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += "★";
  }

  // Add half star if needed
  if (halfStar) {
    starsHTML += "★";
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += "☆";
  }

  return starsHTML;
}

// Set up event listeners
function setupEventListeners() {
  // Search button
  searchBtn.addEventListener("click", performSearch);

  // Search input (search on Enter key)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Cart button
  cartBtn.addEventListener("click", toggleCart);

  // Checkout button
  checkoutBtn.addEventListener("click", checkout);

  // Overlay (close cart when clicking outside)
  overlay.addEventListener("click", closeCart);
}

// Perform search based on input value
function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    displayProducts(products);
    return;
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
}

// Show product details (would typically navigate to product page)
// function showProductDetails(productId) {
//     const product = products.find((p) => p.id === productId);

//     // In a real application, this would navigate to a product detail page
//     // For now, create a modal with product details
//     createDetailModal(product);
// }

// Create and show product detail modal
// function createDetailModal(product) {
//     if (!product) return;

//     // Create modal container
//     const detailModal = document.createElement("div");
//     detailModal.className = "product-detail";

//     detailModal.innerHTML = `
//     <img src="${product.image}" alt="${product.name}">
//     <h2>${product.name}</h2>
//     <div class="price">$${product.price.toFixed(2)}</div>
//     <div class="rating">${generateStarRating(product.rating)}</div>
//     <div class="reviews">${product.reviews} reviews</div>
//     <div class="description">${product.description}</div>
//     <div class="product-actions">
//         <button class="button buy">Add to Cart</button>
//         <button class="button favourite">Add to Favorites</button>
//         <button class="button close">Close</button>
//     </div>
//     `;

//     // Add to body and show overlay
//     document.body.appendChild(detailModal);
//     overlay.classList.add("visible");

//     // Add event listeners
//     const buyButton = detailModal.querySelector(".buy");
//     buyButton.addEventListener("click", () => {
//     addToCart(product);
//     });

//     const favoriteButton = detailModal.querySelector(".favourite");
//     favoriteButton.addEventListener("click", () => {
//     toggleFavorite(favoriteButton, product.id);
//     });

//     const closeButton = detailModal.querySelector(".close");
//     closeButton.addEventListener("click", () => {
//     document.body.removeChild(detailModal);
//     overlay.classList.remove("visible");
//     });
// }

// Toggle favorite status of a product

//   function toggleFavorite(button, productId) {
//     button.classList.toggle("active");

//     // In a real application, you would save this to user preferences/database
//     console.log(`Product ${productId} favorite status toggled`);

//     // Show notification
//     showNotification(
//       button.classList.contains("active")
//         ? "Added to favorites!"
//         : "Removed from favorites!"
//     );
//   }

function toggleFavorite(button, productId) {
  button.classList.toggle("active");

  // Get current favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem("favourites")) || [];

  if (button.classList.contains("active")) {
    // Add to favorites if not already there
    if (!favorites.includes(productId)) {
      favorites.push(productId);
    }
  } else {
    // Remove from favorites
    favorites = favorites.filter((id) => id !== productId);
  }

  // Save back to localStorage
  localStorage.setItem("favourites", JSON.stringify(favorites));

  console.log(`Product ${productId} favorite status toggled`);
  showNotification(
    button.classList.contains("active")
      ? "Added to favorites!"
      : "Removed from favorites!"
  );
  // Save cart to localStorage before navigating
  // Navigate to checkout page
}

// // Add product to cart
function addToCart(product) {
  // Check if product is already in cart
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

  // Save to localStorage for checkout page
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart display
  updateCartDisplay();

  // Show notification
  showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  // Update localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartDisplay();
}

// Update cart items display
function updateCartDisplay() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p>Quantity: ${item.quantity}</p>
              </div>
              <div class="cart-item-price">$${itemTotal.toFixed(2)}</div>
              <button class="remove-btn" data-id="${item.id}">×</button>
          `;

    cartItems.appendChild(cartItem);

    // Add remove button event listener
    const removeBtn = cartItem.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => removeFromCart(item.id));
  });

  cartTotal.textContent = total.toFixed(2);
}

// Toggle cart visibility
function toggleCart() {
  cartContainer.classList.toggle("visible");
  overlay.classList.toggle("visible");
  updateCartDisplay();
}

// Close cart
function closeCart() {
  cartContainer.classList.remove("visible");
  overlay.classList.remove("visible");
}

// Show notification
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector(".cart-notification");

  if (!notification) {
    notification = document.createElement("div");
    notification.className = "cart-notification";
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.classList.add("visible");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("visible");
  }, 3000);
}

// Checkout process
function checkout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!");
    return;
  }
  // Save cart to localStorage before navigating
  localStorage.setItem("cart", JSON.stringify(cart));
  // Navigate to checkout page
  window.location.href = "checkout.html";
}
