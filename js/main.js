// Global variable to hold products data
let products = [];

// Fetch products from the API and store them in the global `products` variable
(async () => {
  try {
    let api = await fetch("trending-product.json");
    let results = await api.json();
    console.log(results);

    // Assign fetched data to the global `products` variable
    products = results;

    let cards = [];

    // Check if results array is empty
    if (results.length === 0) {
      console.error("No products found in the results.");
      document.querySelector(
        "#carouselBody"
      ).innerHTML = `<p>No products available at this time.</p>`;
      return;
    }

    // Generate card HTML for each item in the results
    for (let i = 0; i < results.length; i++) {
      cards.push(`
        <div class="col-xl-3 col-lg-3 col-md-6">
          <a href="/productDetails.html?id=${
            results[i].id
          }" class="product-link">
            <div class="card">
              <div class="img">
                <img src="${results[i].img}" alt="" class="main-img" />
                <img src="${
                  results[i].overlay_img
                }" alt="" class="overlay-img" />
              </div>
              <span class="is_sale ${results[i].is_sale ? "with_padding" : ""}">
                ${results[i].is_sale ? results[i].sale_percentage + "%" : ""}
              </span>
              <div class="body">
                <a href="#" class="name">${results[i].name}</a>
                <div class="price-section">
                  <span class="price">€${results[i].price}</span>
                  <span class="old-price">${
                    results[i].old_price ? "€" + results[i].old_price : ""
                  }</span>
                </div>
              </div>
              <div class="icons">
                <span class="wishlist" data-id="${results[i].id}">
                  <i class="fa-light fa-heart"></i>
                </span>
                <span class="cart" data-id="${results[i].id}">
                  <i class="fa-light fa-bag-shopping"></i>
                </span>
                <span class="showElement" data-id="${results[i].id}">
                  <i class="fa-light fa-eye"></i>
                </span>
              </div>
            </div>
          </a>
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
    document.querySelector("#carouselBody").innerHTML = allCards;

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll(".cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        addToCart(productId); // No need to pass `products` here, it's already global
      });
    });

    // Add event listeners for "Add to Wishlist" buttons
    document.querySelectorAll(".wishlist").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        addToWishlist(productId);
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
  } catch (error) {
    console.error("Error fetching or displaying trending products:", error);
    document.querySelector(
      "#carouselBody"
    ).innerHTML = `<p>Unable to load products at this time.</p>`;
  }
})();

// Function to add item to cart, with quantity parameter
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  if (!product) {
    console.error(`Product with ID ${productId} not found`);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItem = cart.find((item) => item.id === product.id);

  let quantity =
    parseInt(document.getElementById("lightboxQuantity")?.value) || 1; // Ensure we use a valid quantity

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
  location.href = "cart.html"; // Redirect to cart page
}

// Function to add item to wishlist
function addToWishlist(productId) {
  const product = products.find((p) => p.id == productId);
  if (!product) {
    console.error(`Product with ID ${productId} not found`);
    return;
  }

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let wishlistItem = wishlist.find((item) => item.id === product.id);

  if (wishlistItem) {
    alert("Product is already in your wishlist!");
  } else {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
    location.href = "wishlist.html"; // Redirect to wishlist page
  }
}

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

/**************************************************************/
// Our products API
(async () => {
  const fetchProductData = async (url) => {
    try {
      let response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load product data. Please try again later.");
      return null;
    }
  };

  // Helper function to render products
  const renderProducts = (products) => {
    if (!Array.isArray(products)) {
      console.error("Invalid products data, expected an array.");
      return;
    }

    let card = products.map(
      (product) => `
      <div class="col-lg-3 col-md-6">
        <a href="/productDetails.html?id=${product.id}" class="product-link">
          <div class="card">
            <div class="img">
              <img src="${product.img}" alt="" class="main-img"/>
              <img src="${product.overlay_img}" alt="" class="overlay-img"/>
            </div>
            <span class="is_sale ${product.is_sale ? "with_padding" : ""}">
              ${product.is_sale ? product.sale_percentage + "%" : ""}
            </span>
            <div class="body">
              <a href="#" class="name">${product.name}</a>
              <div class="price-section">
                <span class="price">€${product.price}</span>
                <span class="old-price">${
                  product.old_price ? "€" + product.old_price : ""
                }</span>
              </div>
            </div>
            <div class="icons">
              <span class="wishlist" data-id="${
                product.id
              }"><i class="fa-light fa-heart"></i></span>
              <span class="cart" data-id="${
                product.id
              }"><i class="fa-light fa-bag-shopping"></i></span>
              <span class="showElement" data-id="${
                product.id
              }"><i class="fa-light fa-eye"></i></span>
            </div>
          </div>
        </a>
      </div>
    `
    );

    // Group cards into rows
    let allCard = "";
    for (let i = 0; i < Math.ceil(card.length / 4); i++) {
      allCard += `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
          <div class="row">
            ${card.slice(i * 4, i * 4 + 4).join("")}
          </div>
        </div>
      `;
    }
    document.querySelector("#productBody").innerHTML = allCard;

    // Add event listeners for "Add to Cart" buttons after rendering
    document.querySelectorAll(".cart").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        addToCart(productId, products);
      });
    });

    // Add event listeners for "Add to Wishlist" buttons after rendering
    document.querySelectorAll(".wishlist").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        addToWishlist(productId, products);
      });
    });

    // Add event listeners for "showElement" to display lightbox
    document.querySelectorAll(".showElement").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        showProductDetailsInLightbox(productId, products);
        document.querySelector("#lightBoxContainer").style.display = "flex";
      });
    });
  };

  // Function to add item to cart
  const addToCart = (productId, products) => {
    const product = products.find((p) => p.id == productId);
    // Get the quantity from the input field in the lightbox
    const quantity =
      parseInt(document.getElementById("lightboxQuantity").value) || 1;

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    // Get the current cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    let cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      // If the product is already in the cart, update its quantity
      cartItem.quantity += quantity;
    } else {
      // Otherwise, add the product to the cart with the specified quantity
      cart.push({ ...product, quantity });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Alert the user and navigate to the cart page
    alert("Product added to cart!");
    location.href = "cart.html";
  };

  // Function to add item to wishlist
  const addToWishlist = (productId, products) => {
    const product = products.find((p) => p.id == productId);
    if (!product) {
      return;
    }

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlistItem = wishlist.find((item) => item.id === product.id);
    if (!wishlistItem) {
      wishlist.push(product);
    } else {
      alert("Product already in wishlist!");
      return;
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
    location.href = "wishlist.html";
  };

  // Function to show product details in a lightbox
  const showProductDetailsInLightbox = (productId, products) => {
    const product = products.find((p) => p.id == productId);
    if (!product) return;
  
    const productContainer = document.querySelector("#productContainer");
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
                  <button class="btn addCart">Add to Cart</button>
                  <button class="btn wishList">Add to Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // Add event listeners after rendering
    document.querySelector(".addCart").addEventListener("click", () => {
      addToCart(productId, products);
    });
    
    const wishlistButton = document.querySelector(".wishList");
    if (wishlistButton) {
      wishlistButton.addEventListener("click", () => {
        addToWishlist(productId, products);
      });
    }
  };  
  // Close lightbox when clicking outside
  document
    .querySelector("#lightBoxContainer")
    .addEventListener("click", (e) => {
      if (e.target === document.querySelector("#lightBoxContainer")) {
        e.target.style.display = "none";
      }
    });

  // Close lightbox when clicking on the close button
  document
    .querySelector("#closeLightBoxContainerBtn")
    .addEventListener("click", () => {
      document.querySelector("#lightBoxContainer").style.display = "none";
    });

  // Fetch and render products based on category
  const loadProducts = async (category) => {
    let data = await fetchProductData("our-product.json");
    if (!data) return;

    switch (category) {
      case "special":
        renderProducts(data[0].specialProducts);
        break;
      case "new":
        renderProducts(data[1].newProducts);
        break;
      case "bestseller":
        renderProducts(data[2].bestsellerProducts);
        break;
      default:
        renderProducts(data[0].specialProducts);
    }
  };

  // Event listeners for different product categories
  document
    .querySelector("#specialProduct")
    .addEventListener("click", (event) => {
      event.preventDefault();
      loadProducts("special");
    });

  document.querySelector("#newProduct").addEventListener("click", (event) => {
    event.preventDefault();
    loadProducts("new");
  });

  document
    .querySelector("#bestsellerProduct")
    .addEventListener("click", (event) => {
      event.preventDefault();
      loadProducts("bestseller");
    });

  // Load "special" products by default
  loadProducts("special");
})();

/************************************************/
(async () => {
  try {
    let shopApi = await fetch("our-product.json");
    let shopResult = await shopApi.json();

    let shopObjects = [...shopResult];
    console.log("shopObjects:", shopObjects);

    let shopObjectCat = shopObjects[3].cats;
    console.log("shopObjectCat:", shopObjectCat);

    if (!Array.isArray(shopObjectCat)) {
      console.error("shopObjectCat not array");
      return;
    }

    let shopCard = [];

    for (let i = 0; i < shopObjectCat.length; i++) {
      shopCard.push(`
        <div class="col">
          <div class="card">
            <div class="img-container">
              <img src="${shopObjectCat[i].img}" alt="${shopObjectCat[i].aboveTitle}"/>
            </div>
            <div class="aboveTitle">${shopObjectCat[i].aboveTitle}</div>
            <div class="body">
              <p>${shopObjectCat[i].text}</p>
            </div>
          </div>
        </div>
      `);
    }
    // Group cards into carousel items
    let allCards = "";
    for (let i = 0; i < Math.ceil(shopCard.length / 3); i++) {
      allCards += `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row">
          ${shopCard.slice(i * 3, i * 3 + 3).join("")}
        </div>
      </div>
    `;
    }

    // Insert into carousel body
    document.querySelector("#shopRow").innerHTML = allCards;
  } catch (error) {
    console.log("Error: " + error);
  }
})();
/************************************************/
// add Setinterval to spans in dayDealing section

let Day = document.querySelector("#day");
let Hour = document.querySelector("#hour");
let Minute = document.querySelector("#minute");
let Second = document.querySelector("#second");

// Initialize time variables (example starting values)
var day = 84;
var hours = 11;
var minutes = 8;
var seconds = 59;

setInterval(function () {
  // Update the time in each element
  Day.innerHTML = day;
  Hour.innerHTML = hours;
  Minute.innerHTML = minutes;
  Second.innerHTML = seconds;

  // Countdown logic
  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
    if (minutes < 0) {
      minutes = 59;
      hours--;
      if (hours < 0) {
        hours = 23;
        day--;
        if (day < 0) {
          day = 0; // Stop at day 0, or reset as needed
        }
      }
    }
  }
}, 1000); // Update every second (1000ms)

/************************************************/
(async () => {
  try {
    let customerSayingApi = await fetch("our-product.json");
    let customerSayingResult = await customerSayingApi.json();

    let customerSayingResponse = [...customerSayingResult];
    console.log("shopObjects:", customerSayingResponse);

    let customerSaying = customerSayingResponse[4].customerSaying;
    console.log("customerSaying:", customerSaying);

    if (!Array.isArray(customerSaying)) {
      console.error("customerSaying not array");
      return;
    }
    let customerSayingCard = [];
    // Correctly generate customer saying cards
    for (let i = 0; i < customerSaying.length; i++) {
      customerSayingCard.push(`
        <div class="col-lg-6 col-md-6">
          <div class="card cardContent">
            <div class="icon">
           <i class="fa-sharp fa-solid fa-quote-left"></i>
            </div>
            <div class="heading">
                ${customerSaying[i].heading}
            </div>
            <div class="paragraph">
                ${customerSaying[i].paragraph}
            </div>
            <div class="name">
                ${customerSaying[i].name}
            </div>
            <div class="rating">
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
              <i class="fa-sharp fa-solid fa-star"></i>
            </div>
          </div>
        </div>
      `);
    }
    // console.log("customerSayingCard" + customerSayingCard);

    // Group cards into carousel items (5 per item)
    let allCards = "";
    for (let i = 0; i < Math.ceil(customerSayingCard.length / 2); i++) {
      allCards += `
        <div class=" carousel-item ${i === 0 ? "active" : ""}">
          <div class="row">
            ${customerSayingCard.slice(i * 2, (i + 1) * 2).join("")}
          </div>
        </div>
      `;
    }

    // Insert into carousel body
    document.querySelector("#customerSayingBody").innerHTML = allCards;
  } catch (error) {
    console.log("Error" + error);
  }
})();
/************************************************/
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
//****************************************************** */
// JQuery for loading
$(document).ready(function () {
  $(".loading").fadeOut(2000);
});
// ************************************************************************************************
// put login user in the navBar
let userName = document.getElementById("userName");
userName.innerHTML =
  " Welcome , " +
  " " +
  JSON.parse(localStorage.getItem("loggedInUser")).username;
// ************************************************************************************************
// Event listener for clicking on each product card
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const productId = card.getAttribute("data-id"); // Get the product ID from the data-id attribute
    window.location.href = `/productDetails.html?id=${productId}`; // Redirect to the product details page with the product ID
  });
});
// *************************************************************************************************
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
/******************************************************************************************* */
