// Load wishlist items on page load in wishlist.html
document.addEventListener("DOMContentLoaded", loadWishlist);

function loadWishlist() {
  const wishlistContent = document.getElementById("WishlistContent"); // Updated to match the ID in HTML
  const removeAllBtn = document.getElementById("removeAllWishlistBtn"); // Assume a button with this ID exists in your HTML
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlistContent) {
    console.error("Element with ID 'WishlistContent' not found.");
    return;
  }

  if (wishlist.length === 0) {
    wishlistContent.innerHTML = "<p>Your wishlist is empty.</p>";
    document.getElementById("totalPrice").textContent = "Total: €0.00";

    // Hide "Remove All" button when wishlist is empty
    if (removeAllBtn) {
      removeAllBtn.style.display = "none";
    }
    return;
  }

  // Show "Remove All" button when the wishlist has items
  if (removeAllBtn) {
    removeAllBtn.style.display = "block";
  }

  let totalPrice = 0;
  wishlistContent.innerHTML = wishlist
    .map((item) => {
      totalPrice += item.price;

      return `
        <div class="col-lg-6">
          <div class="card totalCard">
            <div class="row">
              <div class="col-3">
                <div class="card mb-5">
                  <img src="${item.img}" alt="${item.name}" class="wishlist-img">
                </div>
              </div>
              <div class="col-6">
                <div class="card">
                  <h5 class="card-title">${item.name}</h5>
                  <p>Price: €${item.price}</p>
                </div>
              </div>
              <div class="col-3">
                <div class="card mt-5">
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

  // Add event listeners for removal
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", removeFromWishlist);
  });

  // Add event listener for "Remove All" button
  if (removeAllBtn) {
    removeAllBtn.addEventListener("click", removeAllFromWishlist);
  }
}

// Function to remove an item from the wishlist
function removeFromWishlist(event) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const itemId = event.target.getAttribute("data-id");

  const itemIndex = wishlist.findIndex((item) => item.id.toString() === itemId.toString());

  if (itemIndex !== -1) {
    if (confirm("Are you sure you want to remove this item from the wishlist?")) {
      wishlist.splice(itemIndex, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      loadWishlist(); // Refresh the wishlist display
    }
  } else {
    console.log("Item not found in the wishlist. Check item ID or wishlist structure.");
  }
}

// Function to remove all items from the wishlist
function removeAllFromWishlist() {
  if (confirm("Are you sure you want to remove all items from the wishlist?")) {
    // Clear the wishlist in localStorage
    localStorage.removeItem("wishlist");
    // Reload the wishlist display to reflect the changes
    loadWishlist();
  }
}
/****************************************************************************************************** */
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