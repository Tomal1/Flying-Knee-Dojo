"use strict";

const instructorName = document.querySelector(".instructorName");

const MT = document.querySelector(".Mauy-Thai");
const JU = document.querySelector(".Judo");
const BJ = document.querySelector(".BJJ");

const MA = [MT, JU, BJ];

class InstructorSec {

  selection = () => {
    for (let i = 0; i < MA.length; i++) {
      const clicked = MA[i];
      clicked.addEventListener("click", (e) => {
        console.log(e.target);
        fetch("../../info.json")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (e.target.src === "http://127.0.0.1:5500/assets/Buakaw2.png") {
              instructorName.textContent = data[0].information;
            } else if (
              e.target.src === "http://127.0.0.1:5500/assets/judo.png"
            ) {
              instructorName.textContent = data[1].instructorName;
            } else {
              instructorName.textContent = data[2].instructorName;
            }
          })
          .catch((error) => console.log(error));
      });
    }
  };
}

const execute = new InstructorSec();
execute.selection();
/////////////////////////////////////////////

const btnCon = document.querySelector("#btnCon");
const image = document.querySelector("#image");

class Carousel {
  constructor() {
    this.content = ["./assets/BJJ.png", "./assets/buakaw.png", "./assets/Buakaw2.png", "./assets/judo.png"];
    this.count = 0;
  }

  buttons = () => {
    const Previous = document.createElement("button");
    Previous.innerText = "Previous";
    btnCon.appendChild(Previous);

    const Next = document.createElement("button");
    Next.innerText = "Next";
    btnCon.appendChild(Next);

    image.src = this.content[this.count];
   

    Next.addEventListener("click", () => {
      this.count > this.content.length - 1
        ? (this.count = 0)
        : (image.src = this.content[this.count++])
        
        
        
    });
    Previous.addEventListener("click", (e) => {
      this.count < 0
        ? (this.count = this.content.length - 1)
        : (image.src = this.content[this.count--])
        
        
    });
  };




}

const invoke = new Carousel();

window.onload = invoke.buttons();




//////////////////////////////////////////////////

const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
  {
    id: 1,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 2,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 3,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  },
  {
    id: 5,
    name: "Vanilla Cupcakes (6 Pack)",
    price: 12.99,
    category: "Cupcake",
  },
  {
    id: 6,
    name: "French Macaron",
    price: 3.99,
    category: "Macaron",
  },
  {
    id: 7,
    name: "Pumpkin Cupcake",
    price: 3.99,
    category: "Cupcake",
  },
  {
    id: 8,
    name: "Chocolate Cupcake",
    price: 5.99,
    category: "Cupcake",
  }
];

products.forEach(({ name, id, price, category }) => {
  dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
      </div>
`;
});

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxRate = 8.25;
  }

  addItem(id, products) {
    const product = products.find((item) => item.id === id);
    const { name, price } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    });

    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    );

    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x`)
      : (productsContainer.innerHTML += `
      <div id=dessert${id} class="product">
        <p>
          <span class="product-count" id=product-count-for-id${id}></span>${name}
        </p>
        <p>${price}</p>
      </div>
      `);
  }

  getCounts() {
    return this.items.length;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    const isCartCleared = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );

    if (isCartCleared) {
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
  }

  calculateTotal() {
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal);
    this.total = subTotal + tax;
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total;
  }
}

const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts();
    cart.calculateTotal();
  });
});

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
