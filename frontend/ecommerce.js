// Smooth Scrolling for Hash Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (event) {
    let hash = this.getAttribute("href");

    // Don't intercept if it's just "#" or empty
    if (hash !== "#" && hash !== "") {
      let target = document.querySelector(hash);
      if (target) {
        event.preventDefault();
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });

        // Update URL hash without jumping
        history.pushState(null, null, hash);
      }
    }
  });
});

// Close mobile menu when a menu item is clicked
document.querySelectorAll(".menu-items a").forEach(link => {
  link.addEventListener("click", function () {
    let checkbox = document.getElementById("checkbox");
    if (checkbox) {
      checkbox.checked = false;
    }
  });
});



// UPDATE CART COUNT FUNCTION
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;
  cart.forEach(item => {
    count += item.quantity;
  });
  let countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.innerText = count;
  }
}

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

// ADD TO CART FUNCTION
document.querySelectorAll(".add-cart button").forEach(button => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    let productCard = this.closest(".best-p1");
    if (!productCard) return;

    let img = productCard.querySelector("img").src;
    let name = productCard.querySelector(".name-of-p p").innerText.trim();

    // Extract price number from raw text (e.g. "Rs. 4500")
    let priceText = productCard.querySelector(".price").innerText;
    let price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

    let product = {
      name: name,
      price: price,
      image: img,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update navbar count immediately
    updateCartCount();

    // Show visual feedback
    let originalText = this.innerText;
    this.innerText = "Added!";
    this.style.backgroundColor = "#4caf50";
    this.style.color = "white";

    setTimeout(() => {
      this.innerText = originalText;
      this.style.backgroundColor = "";
      this.style.color = "";
    }, 1500);
  });
});

// BUY NOW FUNCTION
document.querySelectorAll(".buy-now a").forEach(button => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    let productCard = this.closest(".best-p1");
    if (!productCard) return;

    let img = productCard.querySelector("img").src;
    let name = productCard.querySelector(".name-of-p p").innerText.trim();

    let priceText = productCard.querySelector(".price").innerText;
    let price = parseInt(priceText.replace(/[^0-9]/g, ''), 10);

    let product = {
      name: name,
      price: price,
      image: img,
      quantity: 1
    };

    localStorage.setItem("cart", JSON.stringify([product]));
    window.location.href = "cart.html";
  });
});

