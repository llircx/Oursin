// Initialize checkout page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutItems();
    setupEventListeners();
  });
  
  // Load cart items from local storage
  function loadCheckoutItems() {
    // Try to get cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    
    // If cart is empty, show message
    if (cart.length === 0) {
      checkoutItemsContainer.innerHTML = '<p>Your cart is empty. Please add some products.</p>';
      updateOrderSummary(0, 0, 0);
      return;
    }
    
    // Clear existing content
    checkoutItemsContainer.innerHTML = '';
    
    // Calculate subtotal
    let subtotal = 0;
    
    // Add each item to the checkout view
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'checkout-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
        <div class="checkout-item-details">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-price">$${item.price.toFixed(2)}</div>
          <div class="checkout-item-quantity">Quantity: ${item.quantity}</div>
        </div>
        <button class="remove-item-btn" data-id="${item.id}">×</button>
      `;
      
      checkoutItemsContainer.appendChild(itemElement);
    });
    
    // Set shipping cost based on subtotal
    const shipping = subtotal > 100 ? 0 : 4.99;
    
    // Initially no discount
    const discount = 0;
    
    // Update order summary
    updateOrderSummary(subtotal, shipping, discount);
  }
  
  // Update the order summary section
  function updateOrderSummary(subtotal, shipping, discount) {
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
    const total = subtotal + shipping - discount;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Event delegation for remove item buttons
    document.getElementById('checkoutItems').addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-item-btn')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        removeItemFromCart(productId);
      }
    });
    
    // Apply discount button
    document.getElementById('applyBtn').addEventListener('click', applyDiscount);
    
    // Pay now button
    document.getElementById('payNowBtn').addEventListener('click', processPayment);
  }
  
  // Remove item from cart
  function removeItemFromCart(productId) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item
    cart = cart.filter(item => item.id !== productId);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Reload checkout items
    loadCheckoutItems();
    
    // Show notification
    showNotification('Item removed from cart');
  }
  
  // Apply discount code
  function applyDiscount() {
    const discountCode = document.getElementById('discountCode').value.trim().toUpperCase();
    let subtotal = parseFloat(document.getElementById('subtotal').textContent.replace('$', ''));
    let shipping = parseFloat(document.getElementById('shipping').textContent.replace('$', ''));
    let discount = 0;
    
    // Check discount code
    if (discountCode === 'WELCOME10') {
      discount = subtotal * 0.1; // 10% discount
      showNotification('10% discount applied!');
    } else if (discountCode === 'FREESHIP') {
      shipping = 0;
      showNotification('Free shipping applied!');
    } else {
      showNotification('Invalid discount code', 'error');
      return;
    }
    
    // Update order summary
    updateOrderSummary(subtotal, shipping, discount);
  }
  
  // Process payment (simulated)
  function processPayment() {
    const total = parseFloat(document.getElementById('total').textContent.replace('$', ''));
    
    if (total <= 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }
    
    // Simulate payment processing
    showNotification('Processing payment...');
    
    setTimeout(() => {
      // Clear cart after successful payment
      localStorage.setItem('cart', JSON.stringify([]));
      
      // Show success message
      showNotification('Payment successful! Thank you for your purchase.');
      
      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {

        location.reload();
      }, 2000);
    }, 1500);
  }
  
  // Show notification
  function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.checkout-notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'checkout-notification';
      document.body.appendChild(notification);
    }
    
    // Add type class for styling
    notification.className = `checkout-notification ${type}`;
    notification.textContent = message;
    notification.classList.add('visible');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('visible');
    }, 3000);
  }
  
  // Add notification styles dynamically
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .checkout-notification {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      text-align: center;
    }
    
    .checkout-notification.visible {
      opacity: 1;
    }
    
    .checkout-notification.success {
      background-color: #4caf50;
      color: white;
    }
    
    .checkout-notification.error {
      background-color: #f44336;
      color: white;
    }
  `;
  
  document.head.appendChild(notificationStyles);