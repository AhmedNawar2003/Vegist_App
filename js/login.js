// Logging
let usernameOrEmail = document.getElementById("log_email");  // Field for email or username
let log_password = document.getElementById("log_password");  // Field for password
let login = document.getElementById("login");  // Login button
let log_showPasswordIcon = document.getElementById("log_showPassword");  // Show/hide password icon

login.addEventListener("click", () => {
  // Check if both fields are filled
  if (!usernameOrEmail.value || !log_password.value) {
    alert("Please enter both email/username and password.");
    return;
  }

  // Retrieve users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Determine if input is an email or username
  let isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail.value);

  // Search for the user by email or username (case-insensitive)
  let user = users.find(user => {
    let userEmail = user.email.toLowerCase();
    let userUsername = user.username.toLowerCase();
    let inputEmailOrUsername = usernameOrEmail.value.toLowerCase();

    return (isEmail ? userEmail === inputEmailOrUsername : userUsername === inputEmailOrUsername);
  });

  if (user) {
    // Validate the password
    if (user.password === log_password.value) {
      alert("Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));  // Store logged-in user
      window.location.href = "home.html";  // Redirect to home page
    } else {
      alert("Incorrect password.");
    }
  } else {
    alert("Invalid email/username.");
  }
});

// Show/hide password functionality
log_showPasswordIcon.addEventListener("click", () => {
  if (log_password.type === "password") {
    log_password.type = "text";
    log_showPasswordIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    log_password.type = "password";
    log_showPasswordIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
});


/********************************************************************************** */
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
/******************************************************************************************** */
// ADD event listeners to header navToggle
$(document).ready(function() {
  $("#navBarToggle").click(function() {
      $("#navbarSupportedContent").slideToggle(500); // Toggle the display of the navbar content with a smooth animation
  });
});