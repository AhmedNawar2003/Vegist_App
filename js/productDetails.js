document.addEventListener("DOMContentLoaded", async () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10);
  console.log("Product ID from URL:", productId); // Debug log

  if (!productId) {
    document.getElementById("productDetailsContainer").innerHTML =
      "<p>Product not found. Please check the URL.</p>";
    return;
  }

  let product = null;
  let foundInTrending = false; // Track if product is found in trending

  // Helper function to fetch product data with error handling
  const fetchProductData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      return null;
    }
  };

  try {
    // Try fetching from trending-product.json
    const trendingProducts = await fetchProductData("trending-product.json");
    if (trendingProducts) {
      console.log("Fetched from trending-product.json:", trendingProducts);
      // Search for the product in trending
      product = trendingProducts.find(
        (p) => p.id === productId || p.id === String(productId)
      );
      if (product) {
        foundInTrending = true;
        console.log("Found product in trending-product.json:", product);
      }
    }

    // If product wasn't found in trending, try fetching from our-product.json
    if (!product) {
      const productData = await fetchProductData("our-product.json");
      if (productData) {
        console.log("Fetched from our-product.json:", productData);
        
        // Access the categories correctly
        const categories = [
          productData[0].specialProducts,
          productData[1].newProducts,
          productData[2].bestsellerProducts,
        ];

        for (const products of categories) {
          console.log("Checking category:", products); // Debug log

          // Ensure products is an array and try to find the product
          if (Array.isArray(products)) {
            product = products.find(
              (p) => p.id === productId || p.id === String(productId)
            );
            if (product) {
              console.log("Found product:", product);
              break; // Exit loop if product is found
            }
          }
        }
        console.log("Final product found:", product);
      } else {
        console.error("Failed to fetch product data from our-product.json");
      }
    }

    // If product was found in trending but not in our products, notify user
    if (foundInTrending && !product) {
      document.getElementById("productDetailsContainer").innerHTML = `
        <p>Product not found in <strong>our-product.json</strong>.</p>
        <p>However, it was found in <strong>trending-product.json</strong>.</p>
      `;
      return;
    }

    // If product not found in either file
    if (!product) {
      document.getElementById("productDetailsContainer").innerHTML =
        "<p>Product not found in any source. Please check the ID in the URL.</p>";
      return;
    }

    // Render product details on the page
    document.getElementById("productDetailsContainer").innerHTML = `
      <div class="col-lg-4 col-md-6">
        <div class="card img">
          <img src="${product.img}" alt="" class="main-img" />
          <img src="${product.overlay_img}" alt="" class="overlay-img" />
        </div>
      </div>
      <div class="col-lg-8 col-md-6">
        <div class="card cardContent">
          <div class="card-title">${product.name}</div>
          <div class="price-section">
            <span class="price">€${product.price}</span>
            <span class="old-price">${product.old_price ? "€" + product.old_price : ""}</span>
          </div>
          <p>Quantity: 
            <input type="number" class="quantity" id="lightboxQuantity" value="1" min="1">
          </p>
          <button class="btn addCart" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn addWishlist" onclick="addToWishlist(${product.id})">Add to WishList</button>
        </div>
      </div>
    `;

    // Add to Cart functionality
    window.addToCart = (productId) => {
      const quantity = document.getElementById("lightboxQuantity").value;
      if (quantity <= 0) {
        alert("Please select a valid quantity.");
        return;
      }
      // Check if the cart already exists in localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // Find if the product is already in the cart
      const existingProduct = cart.find((item) => item.id === productId);
      if (existingProduct) {
        // If the product exists, update the quantity
        existingProduct.quantity += parseInt(quantity, 10);
      } else {
        // If it's a new product, add it to the cart
        cart.push({
          id: productId,
          name: product.name,
          price: product.price,
          quantity: parseInt(quantity, 10),
          img: product.img,
        });
      }
      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
      location.href = "cart.html";
    };

    // Add to Wishlist functionality
    window.addToWishlist = (productId) => {
      // Check if the wishlist already exists in localStorage
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      // Find if the product is already in the wishlist
      const existingProduct = wishlist.find((item) => item.id === productId);
      if (!existingProduct) {
        // If the product is not already in the wishlist, add it
        wishlist.push({
          id: productId,
          name: product.name,
          price: product.price,
          img: product.img,
        });
        // Save the updated wishlist to localStorage
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Product added to wishlist!");
      } else {
        alert("This product is already in your wishlist.");
      }
    };

  } catch (error) {
    console.error("Error fetching product details:", error);
    document.getElementById("productDetailsContainer").innerHTML =
      "<p>Error loading product details. Please try again later.</p>";
  }
});
/**************************************************************************************** */
// add event listeners to header and sideButton
var header = document.getElementById("header");
var upToHome = document.getElementById("upToHome");
window.onscroll = function () {
  if (window.scrollY > 100) {
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
// ************************************************************************************************
// Initialize or retrieve the cart and wishlist from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Function to update the cart and wishlist counts
function updateCartAndWishlistCount() {
  // Update the cart and wishlist span elements
  document.getElementById("cartSpan").textContent = cart.length;
  document.getElementById("wishlistSpan").textContent = wishlist.length;
}

// Function to add an item to the wishlist
function addToWishlistSpan(productId) {
  // Check if the product is already in the wishlist
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCartAndWishlistCount(); // Update count
  }
}

// Function to add an item to the cart
function addToCartSpan(productId) {
  // Check if the product is already in the cart
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartAndWishlistCount(); // Update count
  }
}

// Add event listeners to the icons in the product cards
document.addEventListener("DOMContentLoaded", function () {
  // Assuming your products have a unique id (use an appropriate way to get it, e.g., dataset)
  document.querySelectorAll(".product-card").forEach((card) => {
    const productId = card.dataset.productId; // Assuming each card has a data-product-id attribute

    // Wishlist icon click
    card.querySelector(".fa-heart").addEventListener("click", function () {
      addToWishlistSpan(productId);
    });

    // Cart icon click
    card
      .querySelector(".fa-bag-shopping")
      .addEventListener("click", function () {
        addToCartSpan(productId);
      });
  });

  // Update the counts when the page loads
  updateCartAndWishlistCount();
});
/*********************************************************************** */
// ADD event listeners to header navToggle
$(document).ready(function() {
  $("#navBarToggle").click(function() {
      $("#navbarSupportedContent").slideToggle(500); // Toggle the display of the navbar content with a smooth animation
  });
});