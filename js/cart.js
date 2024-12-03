// Load cart items on page load in cart.html
document.addEventListener("DOMContentLoaded", loadCart);

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContent = document.getElementById("cartContent");
  const removeAllBtn = document.getElementById("removeAllBtn");
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContent.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("totalPrice").textContent = "Total: €0.00";

    // Hide "Remove All" button when the cart is empty
    if (removeAllBtn) {
      removeAllBtn.style.display = "none";
    }
    return;
  }

  // Show "Remove All" button when the cart has items
  if (removeAllBtn) {
    removeAllBtn.style.display = "block";
  }

  cartContent.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      return `
        <div class="col-lg-6">
          <div class="card totalCard">
            <div class="row">
              <div class="col-3">
                <div class="card mb-5">
                  <img src="${item.img}" alt="${item.name}" class="cart-img">
                </div>
              </div>
              <div class="col-6">
                <div class="card">
                  <h5 class="card-title">${item.name}</h5>
                  <div class="price-section">
                    <span class="price">€${item.price}</span>
                    <span class="old-price">${item.old_price ? "€" + item.old_price : ""}</span>
                  </div>
                  <p>Quantity: 
                    <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                  </p>
                </div>
              </div>
              <div class="col-3">
                <div class="card mt-5">
                  <p class="item-total" data-id="${item.id}">Item Total: €${itemTotal.toFixed(2)}</p>
                  <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  // Display the total price
  document.getElementById("totalPrice").textContent = `Total Price : €${totalPrice.toFixed(2)}`;

  // Add event listeners for quantity changes and removal
  document.querySelectorAll(".quantity").forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  // Add event listener for "Remove All" button
  removeAllBtn.addEventListener("click", removeAllFromCart);
}

// Function to update the quantity of an item in the cart
function updateQuantity(event) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemId = event.target.getAttribute("data-id");
  const newQuantity = parseInt(event.target.value);

  if (!itemId || isNaN(newQuantity) || newQuantity <= 0) {
    alert("Please enter a valid quantity greater than 0.");
    return;
  }

  const item = cart.find((i) => i.id.toString() === itemId.toString());
  if (!item) {
    console.error("Item not found in cart", itemId);
    return;
  }

  item.quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));

  const itemTotalElement = document.querySelector(`.item-total[data-id="${itemId}"]`);
  if (itemTotalElement) {
    const itemTotal = item.price * item.quantity;
    itemTotalElement.textContent = `Item Total: €${itemTotal.toFixed(2)}`;
  }

  let totalPrice = 0;
  cart.forEach((cartItem) => {
    totalPrice += cartItem.price * cartItem.quantity;
  });
  document.getElementById("totalPrice").textContent = `Total: €${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(event) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemId = event.target.getAttribute("data-id");

  const itemIndex = cart.findIndex((item) => item.id.toString() === itemId.toString());
  if (itemIndex !== -1) {
    if (confirm("Are you sure you want to remove this item from the cart?")) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }
  } else {
    console.log("Item not found in the cart. Check item ID or cart structure.");
  }
}

// Function to remove all items from the cart
function removeAllFromCart() {
  if (confirm("Are you sure you want to remove all items from the cart?")) {
    localStorage.removeItem("cart");
    loadCart();
  }
}

/*************************************************************************************** */
// Initialize or retrieve the cart and wishlist from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to update the cart and wishlist counts
function updateCartAndWishlistCount() {
    // Update the cart and wishlist span elements
    document.getElementById("cartSpan").textContent = cart.length;
    document.getElementById("wishlistSpan").textContent = wishlist.length;
}

// Function to add an item to the wishlist
function addToWishlist(productId) {
    // Check if the product is already in the wishlist
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateCartAndWishlistCount();  // Update count
    }
}

// Function to add an item to the cart
function addToCart(productId) {
    // Check if the product is already in the cart
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartAndWishlistCount();  // Update count
    }
}

// Add event listeners to the icons in the product cards
document.addEventListener("DOMContentLoaded", function () {
    // Assuming your products have a unique id (use an appropriate way to get it, e.g., dataset)
    document.querySelectorAll(".product-card").forEach(card => {
        const productId = card.dataset.productId; // Assuming each card has a data-product-id attribute

        // Wishlist icon click
        card.querySelector(".fa-heart").addEventListener("click", function () {
            addToWishlist(productId);
        });

        // Cart icon click
        card.querySelector(".fa-bag-shopping").addEventListener("click", function () {
            addToCart(productId);
        });
    });

    // Update the counts when the page loads
    updateCartAndWishlistCount();
});
/*************************************************************************************** */
// add event listeners to header and sideButton
var header = document.getElementById("header");
var upToHome = document.getElementById("upToHome");
window.onscroll = function () {
  if (window.scrollY > 500) {
    header.classList.add("header-fixed");
    upToHome.classList.add("showBtn");
  } else {
    header.classList.remove("header-fixed");
    upToHome.classList.remove("showBtn");
  }
};
upToHome.addEventListener("click", function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
});