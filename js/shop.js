let trendingProducts = [];

(async () => {
    let api = await fetch("trending-product.json");
    let results = await api.json();
    trendingProducts = results;
    console.log(trendingProducts);

    if (!Array.isArray(trendingProducts)) {
        return;
    }

    let cards = [];
    // Generate card HTML for each item in the results
    for (let i = 0; i < trendingProducts.length; i++) {
        cards.push(`
          <div class="col-xl-3 col-lg-3 col-md-6">
          <a href="/productDetails.html?id=${trendingProducts[i].id}" class="product-link">
            <div class="card">
              <div class="img">
                <img src="${trendingProducts[i].img}" alt="" class="main-img" />
                <img src="${trendingProducts[i].overlay_img}" alt="" class="overlay-img" />
              </div>
              <span class="is_sale ${trendingProducts[i].is_sale ? "with_padding" : ""}">
                ${trendingProducts[i].is_sale ? trendingProducts[i].sale_percentage + "%" : ""}
              </span>
              <div class="body">
                <a href="#" class="name">${trendingProducts[i].name}</a>
                <div class="price-section">
                  <span class="price">€${trendingProducts[i].price}</span>
                  <span class="old-price">${trendingProducts[i].old_price ? "€" + trendingProducts[i].old_price : ""}</span>
                </div>
              </div>
              <div class="icons">
                 <span class="wishlist" data-id="${trendingProducts[i].id}"><i class="fa-light fa-heart"></i></span>
                 <span class="cart" data-id="${trendingProducts[i].id}"><i class="fa-light fa-bag-shopping"></i></span>
                 <span class="showElement" data-id="${trendingProducts[i].id}"><i class="fa-light fa-eye"></i></span>           
              </div>
            </div>
          </div>
        `);
    }

    // Group cards into carousel items
    let allCards = "";
    for (let i = 0; i < Math.ceil(cards.length / 4); i++) {
        allCards += `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <div class="row">
              ${cards.slice(i * 4, i * 4 + 4).join("")}
            </div>
          </div>
        `;
    }

    // Insert into carousel body
    document.querySelector("#trendingProduct").innerHTML = allCards;

    // Add event listeners for Add to Cart and Add to Wishlist buttons
    document.querySelectorAll(".cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-id");
            addToCart(productId, trendingProducts);
        });
    });

    document.querySelectorAll(".wishlist").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-id");
            addToWishlist(productId, trendingProducts);
        });
    });

    // Add event listeners for "showElement" icons to display lightbox
    document.querySelectorAll(".showElement").forEach((button) => {
        button.addEventListener("click", (event) => {
            const productId = event.currentTarget.getAttribute("data-id");
            showProductDetails(productId, trendingProducts);
            document.querySelector("#lightBoxContainer").style.display = "flex";
        });
    });
})();
// Function to show product details in a lightbox
function showProductDetails(productId, products) {
    const product = products.find((p) => p.id == productId);
    if (!product) {
        console.error(`Product with ID ${productId} not found`);
        return;
    }
    const productContainer = document.querySelector("#productContainer");

    // Show the product details in the lightbox
    productContainer.innerHTML = `
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="row">
                    <div class="col-6">
                        <div class="card">
                            <img src="${product.img}" alt="" />
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card mt-4 card-content">
                            <h2 class="card-title">${product.name}</h2>
                            <div class="price-section">
                                <span class="price">€${product.price}</span>
                                <span class="old-price">${product.old_price ? "€" + product.old_price : ""}</span>
                            </div>
                            <p>Quantity: 
                                <input type="number" class="quantity" id="lightboxQuantity" value="1" min="1">
                            </p>
                            <button class="btn addCart" onclick="addToCart(${product.id})">Add to Cart</button>
                            <button class="btn wishList" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Close lightbox when clicking outside
document.querySelector("#lightBoxContainer").addEventListener("click", (e) => {
    if (e.target === document.querySelector("#lightBoxContainer")) {
        e.target.style.display = "none";
    }
});

// Close lightbox when clicking close button
document.querySelector("#closeLightBoxContainerBtn").addEventListener("click", () => {
    document.querySelector("#lightBoxContainer").style.display = "none";
});

// ************************************************************
(async () => {
  let api = await fetch("our-product.json");
  let results = await api.json();
  let specialProduct = [...results];
  specialProduct = results[0].specialProducts;
  console.log(specialProduct);
  if (!Array.isArray(specialProduct)) {
    return;
  }
  let cards = [];
  products = specialProduct;
  // Generate card HTML for each item in the results
  for (let i = 0; i < specialProduct.length; i++) {
    cards.push(`
        <div class="col-xl-3 col-lg-3 col-md-6">
        <a href="/productDetails.html?id=${
          specialProduct[i].id
        }" class="product-link">
          <div class="card">
            <div class="img">
              <img src="${specialProduct[i].img}" alt="" class="main-img" />
              <img src="${
                specialProduct[i].overlay_img
              }" alt="" class="overlay-img" />
            </div>
            <span class="is_sale ${
              specialProduct[i].is_sale ? "with_padding" : ""
            }">
              ${
                specialProduct[i].is_sale
                  ? specialProduct[i].sale_percentage + "%"
                  : ""
              }
            </span>
            <div class="body">
              <a href="#" class="name">${specialProduct[i].name}</a>
              <div class="price-section">
                <span class="price">€${specialProduct[i].price}</span>
                <span class="old-price">${
                  specialProduct[i].old_price
                    ? "€" + specialProduct[i].old_price
                    : ""
                }</span>
              </div>
            </div>
            <div class="icons">
               <span class="wishlist" data-id="${
                 specialProduct[i].id
               }"><i class="fa-light fa-heart"></i></span>
                 <span class="cart" data-id="${
                   specialProduct[i].id
                 }"><i class="fa-light fa-bag-shopping"></i></span>
                 <span class="showElement" data-id="${
                   specialProduct[i].id
                 }"><i class="fa-light fa-eye"></i></span>        
            </div>
          </div>
        </div>
      `);
  }

  // Group cards into carousel items
  let allCards = "";
  for (let i = 0; i < Math.ceil(cards.length / 4); i++) {
    allCards += `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <div class="row">
            ${cards.slice(i * 4, i * 4 + 4).join("")}
          </div>
        </div>
      `;
  }

  // Insert into carousel body
  document.querySelector("#specialProduct").innerHTML = allCards;
  // Add event listeners for Add to Cart and Add to Wishlist buttons
  document.querySelectorAll(".cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      addToCart(productId, specialProduct);
    });
  });

  document.querySelectorAll(".wishlist").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      addToWishlist(productId, specialProduct);
    });
  });
  // Add event listeners for "showElement" icons to display lightbox
  document.querySelectorAll(".showElement").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      showProductDetails(productId);
      document.querySelector("#lightBoxContainer").style.display = "flex";
    });
  });
})();
// ************************************************************************************************
(async () => {
  let api = await fetch("our-product.json");
  let results = await api.json();
  let newProduct = [...results];
  newProduct = results[1].newProducts;
  console.log(newProduct);
  if (!Array.isArray(newProduct)) {
    return;
  }
  products = newProduct;
  let cards = [];
  // Generate card HTML for each item in the results
  for (let i = 0; i < newProduct.length; i++) {
    cards.push(`
          <div class="col-xl-3 col-lg-3 col-md-6">
          <a href="/productDetails.html?id=${
            newProduct[i].id
          }" class="product-link">
            <div class="card">
              <div class="img">
                <img src="${newProduct[i].img}" alt="" class="main-img" />
                <img src="${
                  newProduct[i].overlay_img
                }" alt="" class="overlay-img" />
              </div>
              <span class="is_sale ${
                newProduct[i].is_sale ? "with_padding" : ""
              }">
                ${
                  newProduct[i].is_sale
                    ? newProduct[i].sale_percentage + "%"
                    : ""
                }
              </span>
              <div class="body">
                <a href="#" class="name">${newProduct[i].name}</a>
                <div class="price-section">
                  <span class="price">€${newProduct[i].price}</span>
                  <span class="old-price">${
                    newProduct[i].old_price ? "€" + newProduct[i].old_price : ""
                  }</span>
                </div>
              </div>
              <div class="icons">
                <span class="wishlist" data-id="${
                  newProduct[i].id
                }"><i class="fa-light fa-heart"></i></span>
                 <span class="cart" data-id="${
                   newProduct[i].id
                 }"><i class="fa-light fa-bag-shopping"></i></span>
                 <span class="showElement"  data-id="${
                   newProduct[i].id
                 }"><i class="fa-light fa-eye"></i></span>        
              </div>
            </div>
          </div>
        `);
  }

  // Group cards into carousel items
  let allCards = "";
  for (let i = 0; i < Math.ceil(cards.length / 4); i++) {
    allCards += `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <div class="row">
              ${cards.slice(i * 4, i * 4 + 4).join("")}
            </div>
          </div>
        `;
  }

  // Insert into carousel body
  document.querySelector("#newProduct").innerHTML = allCards;
  // Add event listeners for Add to Cart and Add to Wishlist buttons
  document.querySelectorAll(".cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      addToCart(productId, newProduct);
    });
  });

  document.querySelectorAll(".wishlist").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      addToWishlist(productId, newProduct);
    });
  });
  // Add event listeners for "showElement" icons to display lightbox
  document.querySelectorAll(".showElement").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      showProductDetails(productId);
      document.querySelector("#lightBoxContainer").style.display = "flex";
    });
  });
})();
// ************************************************************************************************
(async () => {
  let api = await fetch("our-product.json");
  let results = await api.json();
  let bestsellerProduct = [...results];
  bestsellerProduct = results[2].bestsellerProducts;
  console.log(bestsellerProduct);
  if (!Array.isArray(bestsellerProduct)) {
    return;
  }
  products = bestsellerProduct;
  let cards = [];
  // Generate card HTML for each item in the results
  for (let i = 0; i < bestsellerProduct.length; i++) {
    cards.push(`
          <div class="col-xl-3 col-lg-3 col-md-6">
          <a href="/productDetails.html?id=${
            bestsellerProduct[i].id
          }" class="product-link">
            <div class="card">
              <div class="img">
                <img src="${
                  bestsellerProduct[i].img
                }" alt="" class="main-img" />
                <img src="${
                  bestsellerProduct[i].overlay_img
                }" alt="" class="overlay-img" />
              </div>
              <span class="is_sale ${
                bestsellerProduct[i].is_sale ? "with_padding" : ""
              }">
                ${
                  bestsellerProduct[i].is_sale
                    ? bestsellerProduct[i].sale_percentage + "%"
                    : ""
                }
              </span>
              <div class="body">
                <a href="#" class="name">${bestsellerProduct[i].name}</a>
                <div class="price-section">
                  <span class="price">€${bestsellerProduct[i].price}</span>
                  <span class="old-price">${
                    bestsellerProduct[i].old_price
                      ? "€" + bestsellerProduct[i].old_price
                      : ""
                  }</span>
                </div>
              </div>
              <div class="icons">
                 <span class="wishlist" data-id="${
                   bestsellerProduct[i].id
                 }"><i class="fa-light fa-heart"></i></span>
                 <span class="cart" data-id="${
                   bestsellerProduct[i].id
                 }"><i class="fa-light fa-bag-shopping"></i></span>
                 <span class="showElement" data-id="${
                   bestsellerProduct[i].id
                 }"><i class="fa-light fa-eye"></i></span>        
              </div>
            </div>
          </div>
        `);
  }

  // Group cards into carousel items
  let allCards = "";
  for (let i = 0; i < Math.ceil(cards.length / 4); i++) {
    allCards += `
          <div class="carousel-item ${i === 0 ? "active" : ""}">
            <div class="row">
              ${cards.slice(i * 4, i * 4 + 4).join("")}
            </div>
          </div>
        `;
  }

  // Insert into carousel body
  document.querySelector("#bestsellerProduct").innerHTML = allCards;
  // Add event listeners for Add to Cart and Add to Wishlist buttons
  document.querySelectorAll(".cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      addToCart(productId, bestsellerProduct);
    });
  });

  document.querySelectorAll(".wishlist").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      addToWishlist(productId, bestsellerProduct);
    });
  });
  // Add event listeners for "showElement" icons to display lightbox
  document.querySelectorAll(".showElement").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.getAttribute("data-id");
      showProductDetails(productId);
      document.querySelector("#lightBoxContainer").style.display = "flex";
    });
  });
})();
/*************************************************************** */
// Function to add item to cart
const addToCart = (productId, products) => {
  const product = products.find((p) => p.id == productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  let cartItem = cart.find((item) => item.id === product.id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Show confirmation
  alert("Product added to cart!");
  location.href = "cart.html";
};

// Function to add item to wishlist
const addToWishlist = (productId, products) => {
  const product = products.find((p) => p.id == productId);
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Check if the product is already in the wishlist
  if (wishlist.find((item) => item.id === product.id)) {
    alert("This product is already in your wishlist.");
    return;
  }

  // Add product to wishlist
  wishlist.push(product);

  // Save updated wishlist to localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  // Show confirmation
  alert("Product added to wishlist!");
  location.href = "wishlist.html";
};

// Function to show product details in a lightbox
function showProductDetails(productId) {
  const product = products.find((p) => p.id == productId);
  if (!product) {
    console.error(`Product with ID ${productId} not found`);
    return;
  }
  const productContainer = document.querySelector("#productContainer");

  // Show the product details in the lightbox
  productContainer.innerHTML = `
  <div class="row">
      <div class="col-12">
          <div class="card">
              <div class="row">
                  <div class="col-6">
                      <div class="card">
                          <img src="${product.img}" alt="" />
                      </div>
                  </div>
                  <div class="col-6">
                      <div class="card mt-4 card-content">
                          <h2 class="card-title">${product.name}</h2>
                          <div class="price-section">
                              <span class="price">€${product.price}</span>
                              <span class="old-price">${
                                product.old_price ? "€" + product.old_price : ""
                              }</span>
                          </div>
                          <p>Quantity: 
                              <input type="number" class="quantity" id="lightboxQuantity" value="1" min="1">
                          </p>
                          <button class="btn addCart" onclick="addToCart(${
                            product.id
                          })">Add to Cart</button>
                          <button class="btn wishList" onclick="addToWishlist(${
                            product.id
                          })">Add to Wishlist</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `;
}

// Close lightbox when clicking outside
document.querySelector("#lightBoxContainer").addEventListener("click", (e) => {
  if (e.target === document.querySelector("#lightBoxContainer")) {
    e.target.style.display = "none";
  }
});

// Close lightbox when clicking close button
document
  .querySelector("#closeLightBoxContainerBtn")
  .addEventListener("click", () => {
    document.querySelector("#lightBoxContainer").style.display = "none";
  });
/******************************************************************* */
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
function addToWishlistH(productId) {
  // Check if the product is already in the wishlist
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCartAndWishlistCount(); // Update count
  }
}

// Function to add an item to the cart
function addToCartT(productId) {
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
      addToWishlist(productId);
    });

    // Cart icon click
    card
      .querySelector(".fa-bag-shopping")
      .addEventListener("click", function () {
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
$(document).ready(function () {
  $("#navBarToggle").click(function () {
    $("#navbarSupportedContent").slideToggle(500); // Toggle the display of the navbar content with a smooth animation
  });
});
/************************************************************************* */
// Event listener for clicking on each product card
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.getAttribute("data-id"); // Get the product ID from the data-id attribute
    window.location.href = `/productDetails.html?id=${productId}`; // Redirect to the product details page with the product ID
  });
});
/**************************************************************** */
