// Reset Password
let usernameOrEmail = document.getElementById("reset_email"); // Field for email or username
let newPassword = document.getElementById("new_password"); // Field for new password
let confirmPassword = document.getElementById("confirm_password"); // Field for confirm password
let resetButton = document.getElementById("reset_button"); // Reset button
let resetShowPasswordIconConfirm = document.getElementById("reset_showPasswordConfirm"); // Confirm password icon
let resetShowPasswordIconNew = document.getElementById("reset_showPasswordNew"); // New password icon

resetButton.addEventListener("click", () => {
  // Check if all fields are filled
  if (!usernameOrEmail.value || !newPassword.value || !confirmPassword.value) {
    alert("Please fill in all fields.");
    return;
  }

  // Check if passwords match
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  // Retrieve users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Determine if input is an email or username
  let isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail.value);

  // Search for the user by email or username (case-insensitive)
  let userIndex = users.findIndex((user) => {
    let userEmail = user.email.toLowerCase();
    let userUsername = user.username.toLowerCase();
    let inputEmailOrUsername = usernameOrEmail.value.toLowerCase();

    return isEmail
      ? userEmail === inputEmailOrUsername
      : userUsername === inputEmailOrUsername;
  });

  if (userIndex !== -1) {
    // Update the user's password with the new password
    users[userIndex].password = newPassword.value;

    // Save the updated users list in localStorage
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful!");

    // Optionally redirect to login page
    window.location.href = "login.html";
  } else {
    alert("No user found with this email/username.");
  }
});

// Show/hide password functionality for the new password field
resetShowPasswordIconNew.addEventListener("click", () => {
  if (newPassword.type === "password") {
    newPassword.type = "text";
    resetShowPasswordIconNew.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    newPassword.type = "password";
    resetShowPasswordIconNew.classList.replace("fa-eye-slash", "fa-eye");
  }
});

// Show/hide password functionality for the confirm password field
resetShowPasswordIconConfirm.addEventListener("click", () => {
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
    resetShowPasswordIconConfirm.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    confirmPassword.type = "password";
    resetShowPasswordIconConfirm.classList.replace("fa-eye-slash", "fa-eye");
  }
});

/******************************************************************************************* */
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
/********************************************************************* */
$(document).ready(function() {
  $("#navBarToggle").click(function() {
      $("#navbarSupportedContent").slideToggle(500); // Toggle the display of the navbar content with a smooth animation
  });
});