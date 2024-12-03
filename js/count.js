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