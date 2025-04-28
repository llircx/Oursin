// // Utility to get products from localStorage
// function getProducts() {
//     return JSON.parse(localStorage.getItem('products') || '[]');
// }

// // Utility to save products to localStorage
// function saveProducts(products) {
//     localStorage.setItem('products', JSON.stringify(products));
// }

// // Render the statistics
// function renderStats() {
//     const statsEl = document.getElementById('stats');
//     const products = getProducts();
//     if (products.length === 0) {
//         statsEl.innerHTML = `<span class="stat">No products.</span>`;
//         return;
//     }
//     const prices = products.map(p => parseFloat(p.price));
//     const total = products.length;
//     const avg = (prices.reduce((sum, v) => sum + v, 0) / total).toFixed(2);
//     const max = Math.max(...prices).toFixed(2);
//     const min = Math.min(...prices).toFixed(2);

//     statsEl.innerHTML = `
//         <span class="stat">Total: <strong>${total}</strong></span>
//         <span class="stat">Avg Price: <strong>$${avg}</strong></span>
//         <span class="stat">Highest: <strong>$${max}</strong></span>
//         <span class="stat">Lowest: <strong>$${min}</strong></span>
//     `;
// }

// // Render the products
// function renderProducts() {
//     const list = document.getElementById('productList')
//     list.innerHTML = '';
//     const products = getProducts();
//     products.forEach((prod, idx) => {
//         // Separate code from title if code at the end (e.g., AIK5066)
//         let title = prod.title;
//         let code = '';
//         const divide = title.split(' ');
//         if (divide.length > 1 && /\w\d+$/.test(divide[divide.length-1])) {
//             code = divide.pop();
//             title = divide.join(' ');
//         }
//         const card = document.createElement('div');
//         card.className = 'product-card';
//         card.innerHTML = `
//             <img src="${prod.image}" alt="product image">
//             <div class="product-title">${title}
//                 ${code ? `<span class="product-code">${code}</span>` : ''}
//             </div>
//             <div class="product-price">$${parseFloat(prod.price).toFixed(2)}</div>
//             <button onclick="deleteProduct(${idx})">Delete</button>
//         `;
//         list.appendChild(card);
//     });
//     renderStats();
// }

// // Delete a product
// function deleteProduct(index) {
//     if (confirm("Are you sure to delete this product?")) {
//         const products = getProducts();
//         products.splice(index, 1);
//         saveProducts(products);
//         renderProducts();
//     }
// }

// // Handle new product form submission
// document.getElementById('productForm').addEventListener('submit', function(e){
//     e.preventDefault();
//     const file = document.getElementById('productImage').files[0];
//     const title = document.getElementById('productTitle').value.trim();
//     const price = document.getElementById('productPrice').value;
//     if (!file || !title || !price) return alert('All fields required.');
//     const reader = new FileReader();
//     reader.onload = function(evt){
//         const imageBase64 = evt.target.result;
//         const products = getProducts();
//         products.unshift({ image: imageBase64, title, price });
//         saveProducts(products);
//         renderProducts();
//         document.getElementById('productForm').reset();
//     }
//     reader.readAsDataURL(file);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const productForm = document.getElementById("productForm");
//   const productList = document.getElementById("productList");

//   productForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const title = document.getElementById("productTitle").value.trim();
//     const price = parseFloat(document.getElementById("productPrice").value);
//     const imageFile = document.getElementById("productImage").files[0];

//     if (!imageFile) {
//       alert("Please select an image.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = function () {
//       const base64Image = reader.result; // Base64 encoded image

//       const token = localStorage.getItem("token"); // Get token from localStorage
//       console.log(token);

//       if (!token) {
//         alert("No token found. Please log in again.");
//         return;
//       }

//       const productData = {
//         name: title,
//         price: price,
//         imageUrl: base64Image,
//       };

//       fetch("https://project01spiderx.runasp.net/api/Products/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(productData),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("Product added successfully:", data);
//           alert("Product added successfully!");
//           productForm.reset();
//           // Optionally, you can refresh the product list here
//           loadProducts();
//         })
//         .catch((error) => {
//           console.error("Error adding product:", error);
//           alert("Failed to add product. Please try again.");
//         });
//     };

//     reader.readAsDataURL(imageFile);
//   });

//   function loadProducts() {
//     // You can implement loading and displaying products here if needed
//   }
// });

// // Render on load
// window.renderProducts = renderProducts;
// window.deleteProduct = deleteProduct;
// window.onload = renderProducts;
