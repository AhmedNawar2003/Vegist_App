  // Registration
  let username = document.getElementById("username");
  let email = document.getElementById("Reg_email");
  let password = document.getElementById("Reg_password");
  let register = document.getElementById("register");
  let showPasswordIcon = document.getElementById("showReg_password");
  
  register.addEventListener("click", () => {
    // Regular expressions for email and password validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check for empty fields
    if (!username.value || !email.value || !password.value) {
      alert("All fields are required.");
      return;
    }
  
    // Validate email format
    if (!emailRegex.test(email.value)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Validate password criteria
    if (!passwordRegex.test(password.value)) {
      alert("Password must be at least 8 characters, with an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }
  
    // Check if email or username already exists
    let existingUser = users.find(user => user.email === email.value || user.username === username.value);
    if (existingUser) {
      alert(existingUser.email === email.value ? "This email is already registered." : "This username is already taken.");
      return;
    }
  
    // Add new user to users array and save in local storage
    users.push({
      username: username.value,
      email: email.value,
      password: password.value,
    });
  
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
  
    // Clear input fields
    username.value = "";
    email.value = "";
    password.value = "";
  });
  
  // Show/hide password functionality
  showPasswordIcon.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      showPasswordIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      password.type = "password";
      showPasswordIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
  /**************************************************************************** */
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