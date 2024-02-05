let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = JSON.parse(localStorage.getItem('total')) || 0;
var cartCon = document.getElementById("cart");
var cartBadge = document.getElementsByClassName("badge");
var cartBottom = document.getElementById("cartBottom");

const buttons = cartBottom.querySelectorAll("button");




function DiableButtons() {
    if (total > 0) {
        buttons[0].disabled = false
        buttons[1].disabled = false
    } else {
        buttons[0].disabled = true
        buttons[1].disabled = true
    }
}

DiableButtons();
function OpenCart() {
    updateCartDisplay();
    cartCon.classList.toggle("cartDisplay");
}
function closeCart() {
    cartCon.classList.toggle("cartDisplay");

}
function clearStorage() {
    localStorage.clear();
    location.reload();
}
cartBadge[0].innerHTML = cart.length
cartBadge[1].innerHTML = cart.length

async function addToCart(productId, e) {
    e.preventDefault();
    let response = await fetch(`https://productsapi-sigma.vercel.app/products?id=${productId}`);
    let productDetails = await response.json();

    const product = document.querySelector(`[data-id="${productId}"]`);
    // console.log(product.dataset);
    // const name = product.dataset.name;
    // const price = parseFloat(product.dataset.price);
    const name = productDetails[0].name;
    const price = parseFloat(productDetails[0].price);
    const image = productDetails[0].image;
    const existingItem = cart.find(item => item.id === productId);
    ShowToast(name)

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // const newItem = { id, name, price, quantity: 1 };
        // cart.push(newItem);
        cart.push({ id: productId, name, price, image, quantity: 1 });
    }
    // cart.push({ id: productId, name, price, image });
    // total += price;
    updateCartDisplay();
    DiableButtons();
    updateLocalStorage();
    cartBadge[0].innerHTML = cart.length
    cartBadge[1].innerHTML = cart.length
    // ckBtn.disabled = false;
}

function updateCartDisplay() {

    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    total = 0;

    // Clear previous items
    cartItems.innerHTML = "";
    console.log(cart);
    // Update cart items
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<img src="${item.image}" width=100 height=100/>${item.name} - $${item.price.toFixed(2)}
        <div style="display:inline-block; ">
        <button class="StateButton"  onclick="decreaseQuantity(${item.id})">-</button>
        ${item.quantity}
        <button class="StateButton" onclick="increaseQuantity(${item.id})">+</button>
        <button class="StateButton"  onclick="removeFromCart(${item.id})"><i style="color:white"
         class="fa-solid fa-trash-can"></i></button>
        </div>
       
                    `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    // Update total price
    totalPrice.textContent = total.toFixed(2);
    cartBadge[0].innerHTML = cart.length
    cartBadge[1].innerHTML = cart.length
    DiableButtons();
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartDisplay();
        updateLocalStorage();
    }
}


// Increase quantity function
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        updateLocalStorage();
    }
}

// Remove from cart function
function removeFromCart(id) {
    cart = cart.filter(item =>
        item.id !== id
    );
    // if (item.id === id) total -= item.price * item.quantity
    console.log(cart);
    updateCartDisplay();
    updateLocalStorage();
}

function Checkout() {

    cartBottom.innerHTML = `   <div class="checkout">
        <i class="fa-regular fa-circle-check"></i>
        <p>Checked out Total Items Price : ${total.toFixed(2)} $ </p>
      </div>`
    setTimeout(function () {
        localStorage.clear();
        location.reload();
    }, 2000)

}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', JSON.stringify(total));

}


function ShowToast(name) {
    document.getElementById('errortip').style.display = 'block';
    document.getElementById('toast-body').innerHTML = `<strong>${name} Has been added to your cart</strong>`;
    setTimeout(function () {
        document.getElementById('errortip').style.display = 'none';

    }, 2000)
}