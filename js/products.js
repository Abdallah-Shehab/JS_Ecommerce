let products = []
let categories = []
let stock = []
let con = document.getElementById("container")
let butt_con = document.getElementById("butt-container")
let Stock_butt_container = document.getElementById("Stock-butt-container")
let loader = document.getElementById("loader");


console.log(con);

function checkIfDivLoaded() {
  console.log("The <div> content has finished loading!");
  // You can perform other actions here once the <div> is fully loaded.
}

if (document.readyState === "loading") {
  // The document is still loading
  document.addEventListener("DOMContentLoaded", checkIfDivLoaded);
  console.log("Not yet");
  // loader.style.display = "block";
  loader.style.display = "block";

} else {
  // The document has already finished loading
  checkIfDivLoaded();
}
async function getProducts() {
  // let response = await fetch("http://localhost:3000/products")
  let response = await fetch("https://productsapi-sigma.vercel.app/products")
  products = await response.json()
  console.log(products);
  products.forEach(item => {
    if (categories.indexOf(item.category) === -1) {

      categories.push(item.category);
    }
    if (stock.indexOf(item.inStock) === -1) {

      stock.push(item.inStock);
    }

  });



  for (let item of categories) {
    butt_con.innerHTML += `<button type="button" class="btn btn-outline btn-sm button-active"
                           onclick="filterCategory('${item}')">${item}</button>`

  }
  for (let item of stock) {
    if (item == true) {
      Stock_butt_container.innerHTML += `<button type="button" class="btn btn-outline btn-sm button-active"
      onclick="filterStock('${item}')">In Stock</button>`
    } else {
      Stock_butt_container.innerHTML += `<button type="button" class="btn btn-outline btn-sm button-active"
      onclick="filterStock('${item}')">Out of Stock</button>`
    }

  }
  updateDoc();

}

getProducts();


async function filterCategory(cat, stock_state) {

  let response = []
  try {
    if (cat != '') response = await fetch(`https://productsapi-sigma.vercel.app/products?category=${cat}`);
    else response = await fetch(`https://productsapi-sigma.vercel.app/products`)


    // let response = await fetch(`https://productsapi-sigma.vercel.app/products?category=${cat}&&inStock=true`);


    products = await response.json();
    console.log(products);
    updateDoc();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function filterStock(stock_state) {
  try {
    let response = await fetch(`https://productsapi-sigma.vercel.app/products?inStock=${stock_state}`);
    products = await response.json();
    console.log(products);
    updateDoc();

  } catch (error) {
    console.error('Error fetching data:', error);

  }

}


function updateDoc() {
  con.innerHTML = "";
  for (let index in products) {
    if (products[index].inStock == true) {
      con.innerHTML += `<div class="card" data-id="${products[index].id}" data-name="${products[index].name}" data-price="${products[index].price} " >
    
      <div class="imgBox" onclick="openProductDetails('${products[index].id}')">
        <img src="${products[index].image}" alt="mouse corsair" class="mouse" width=100px height=200px>
      </div>
    
      <div class="contentBox">
        <h3>${products[index].name}</h3>
        <h2 class="price">${products[index].price} €</h2>
        
        <a href="#"  onclick="addToCart(${products[index].id},event)" class="buy">ADD To Cart</a>
        
      </div>
    
    </div>`;
    } else {
      con.innerHTML += `<div class="card" data-id="${products[index].id}" data-name="${products[index].name}" data-price="${products[index].price} " >
    
        <div class="imgBox" onclick="openProductDetails('${products[index].id}')">
          <img src="${products[index].image}" alt="mouse corsair" class="mouse" width=100px height=200px>
        </div>
      
        <div class="contentBox">
          <h3>${products[index].name}</h3>
          <h2 class="price">${products[index].price} €</h2>
          
          
          
        </div>
      
      </div>`;
    }

  }
}
function openProductDetails(productId) {
  // Navigate to a new HTML page with the product details
  window.location.href = `ProductDetails.html?id=${productId}`;
}
