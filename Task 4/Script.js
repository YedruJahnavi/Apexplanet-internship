const allProducts = {
  fruits: [
    { name: "Apple", price: 80, image: "https://i.imgur.com/Kz9KzrE.png" },
    { name: "Banana", price: 30, image: "https://i.imgur.com/dxjd7FB.png" }
  ],
  vegetables: [
    { name: "Tomato", price: 20, image: "https://i.imgur.com/O83OCNf.png" },
    { name: "Potato", price: 25, image: "https://i.imgur.com/0rI0Gqf.png" }
  ],
  snacks: [
    { name: "Chips", price: 15, image: "https://i.imgur.com/4d4f4YH.png" },
    { name: "Biscuits", price: 20, image: "https://i.imgur.com/6LEe3vK.png" }
  ],
  drinks: [
    { name: "Cola", price: 40, image: "https://i.imgur.com/CaRZfDt.png" },
    { name: "Juice", price: 50, image: "https://i.imgur.com/KhwxOZw.png" }
  ],
  dairy: [
    { name: "Milk", price: 30, image: "https://i.imgur.com/4u1J8UE.png" },
    { name: "Curd", price: 25, image: "https://i.imgur.com/sDHEiRY.png" }
  ],
  bakery: [
    { name: "Bread", price: 35, image: "https://i.imgur.com/7x6JTPN.png" },
    { name: "Cake", price: 100, image: "https://i.imgur.com/qX1evRT.png" }
  ]
};

let cart = [];

function loadProducts(category) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  allProducts[category].forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function searchProducts(query) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  const lowerQuery = query.toLowerCase();
  let matched = [];
  for (let category in allProducts) {
    matched = matched.concat(allProducts[category].filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    ));
  }
  if (matched.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }
  matched.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

document.querySelector(".search-bar input").addEventListener("input", function () {
  const value = this.value.trim();
  if (value === "") {
    loadProducts("fruits");
  } else {
    searchProducts(value);
  }
});

function addToCart(product) {
  const found = cart.find(item => item.name === product.name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  let total = 0;
  let count = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.qty} - ₹${item.price * item.qty}
      <button class="remove-btn" onclick="removeItem(${index})">✕</button>
    `;
    list.appendChild(li);
  });
  document.getElementById("cart-count").innerText = count;
  document.getElementById("cart-total").innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const popup = document.getElementById("cart-popup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
}

loadProducts('fruits');
