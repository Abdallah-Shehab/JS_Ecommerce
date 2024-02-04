const productId = new URLSearchParams(window.location.search).get('id');
let container = document.getElementById('con');

console.log(productId);
// Use the product ID to fetch and display product details
async function displayProductDetails() {
  try {
    let response = await fetch(`https://productsapi-sigma.vercel.app/products?id=${productId}`);
    let productDetails = await response.json();
    for (let item of productDetails) {
      if (item.inStock == true) {

        container.innerHTML = `<div class="row justify-content-center row-data"
         data-id="${item.id}" data-name="${item.name}" data-price="${item.price} ">
            <div class="col-md-8 data-col">
              <div class="data-container">
                <h1 id="title"> ${item.name}</h1>
                <div class="image-container" id="image-container">
                  <div class="stock">
                  <i style="color:yellow" class="fa-solid fa-face-laugh-beam"></i>
                    <span style="color:yellow">In Stock</span>
                    
                  </div>
                  <img src="${item.image}" alt="" />
                </div>
                <div class="data">
                  <div class="data-row">
                    <h2>Category</h2>
                    <h3> ${item.category}</h3>
                  </div>
                  <div class="data-row">
                    <h2>Brand</h2>
                    <h3> ${item.brand}</h3>
                  </div>
                  <div class="data-row">
                    <h2>Color</h2>
                    <h3> ${item.color}</h3>
                  </div>
                  <div class="data-row">
                    <h2>Description</h2>
                    <p>
                    ${item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 button-col mt-3">
              <div class="data-container">
                <div class="data">
                  <div class="data-row">
                    <h3>Price : ${item.price} $</h3>
                  </div>
                  <div class="data-row">
                    <button type="button"  class="btn btn-outline btn-sm"  onclick="addToCart(${item.id},event)">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
      } else {
        container.innerHTML = `<div class="row justify-content-center row-data">
            <div class="col-md-8 data-col">
              <div class="data-container">
                <h1 id="title"> ${item.name}</h1>
                <div class="image-container" id="image-container">
                  <div class="stock">
                  <i style="color:red" class="fa-solid fa-face-frown"></i>
                    <span style="color:red">Out Of Stock</span>
                  </div>
                  <img src="${item.image}" alt="" />
                </div>
                <div class="data">
                  <div class="data-row">
                    <h2>Category</h2>
                    <h3> ${item.category}</h3>
                  </div>
                  <div class="data-row">
                    <h2>Brand</h2>
                    <h3> ${item.brand}</h3>
                  </div>
                  <div class="data-row">
                    <h2>Color</h2>
                    <h3> ${item.color}</h3>
                  </div>
                  <div class="data-row">
                    <h2>Description</h2>
                    <p>
                    ${item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 button-col mt-3">
              <div class="data-container">
                <div class="data">
                  <div class="data-row">
                    <h3>Price : ${item.price} $</h3>
                  </div>
                  <div class="data-row">
                    <button type="button" class="btn btn-outline btn-sm" disabled>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
      }

      console.log(item);
    }

    // Display product details on the page
    // document.getElementById('productName').innerText = productDetails.name;
    // document.getElementById('productDescription').innerText = productDetails.description;
    // Add more details as needed
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

window.onload = displayProductDetails;
console.log(container);
