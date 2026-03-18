let cart = JSON.parse(localStorage.getItem("cart")) || [];

let container = document.getElementById("cart-container");

if (cart.length === 0) {
    container.innerHTML = "<div class='empty-cart-msg'>Your cart is empty 🛒</div>";
} else {

    let total = 0;
    let htmlContent = "";

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        htmlContent += `
            <div class="cart-item">
                <div style="display: flex; align-items: center;">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Rs. ${item.price} x ${item.quantity}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button onclick="removeItem(${index})"><i class='bx bx-trash'></i> Remove</button>
                </div>
            </div>
        `;
    });

    htmlContent += `
        <div class="cart-summary">
            <h2>Total: Rs. ${total}</h2>
            <div class="cart-actions">
                <button class="btn-clear" onclick="clearCart()">Clear Cart</button>
                <button class="btn-checkout" onclick="checkout()">Checkout</button>
            </div>
        </div>
    `;

    container.innerHTML = htmlContent;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}

function checkout() {
    if (cart.length === 0) return;
    window.location.href = "checkout.html";
}
