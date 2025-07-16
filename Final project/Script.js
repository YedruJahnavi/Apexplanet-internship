const products = [
  { name: "Floral Top", category: "Tops", price: 799, img: "https://tse2.mm.bing.net/th/id/OIP._6hzbbfj2lWWYwF1YMy3qAHaJ2?pid=Api&P=0&h=180" },
  { name: "Silk Saree", category: "Sarees", price: 2999, img: "https://tse3.mm.bing.net/th/id/OIP.JdkdnlT6dvri6vcdjZYXKwHaKt?pid=Api&P=0&h=180" },
  { name: "Printed Kurti", category: "Kurtis", price: 1199, img: "https://tse3.mm.bing.net/th/id/OIP.m86FrHV-yMBXFcps_-4JvwHaKm?pid=Api&P=0&h=180" },
  { name: "Denim Skirt", category: "Skirts", price: 899, img: "https://tse2.mm.bing.net/th/id/OIP.3KFIEDfMDIUIfTvLtUA0sQHaJ4?pid=Api&P=0&h=180" },
  { name: "Anarkali Kurti", category: "Kurtis", price: 1399, img: "https://tse2.mm.bing.net/th/id/OIP.eFXJik3wnAHIrfpUR0bOoAHaJQ?pid=Api&P=0&h=180" },
  { name: "Crop Top", category: "Tops", price: 699, img: "https://tse1.mm.bing.net/th/id/OIP.BwkWWvt2jd02e8_ENY3d2AHaKh?pid=Api&P=0&h=180" },
  { name: "Party Saree", category: "Sarees", price: 3499, img: "https://tse4.mm.bing.net/th/id/OIP.rixiumjUrTqbTMUNC1sp4wHaLH?pid=Api&P=0&h=180" },
  { name: "Boho Maxi Dress", category: "Dresses", price: 1599, img: "https://i.pinimg.com/originals/37/e4/07/37e4071b7098d48fda797bcb2faa68f9.jpg" },
  { name: "Long Skirt", category: "Skirts", price: 899, img: "https://tse3.mm.bing.net/th/id/OIP.k7MObVFSNaYC8PYVERV1eQHaJ4?pid=Api&P=0&h=180" },
  { name: "Chiffon Saree", category: "Sarees", price: 2799, img: "https://tse1.mm.bing.net/th/id/OIP.erc5A_Y-j5UE73nd5IQE3wHaKL?pid=Api&P=0&h=180" },
  { name: "Casual T-Shirt", category: "Tops", price: 599, img: "https://tse2.mm.bing.net/th/id/OIP.5XXPFxpBiYOnfsft9SobWwHaJ4?pid=Api&P=0&h=180" }
];

let cart = [];
let wishlist = [];
let currentCategory = 'All';

function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === 'shop') displayProducts(products);
  else if (id === 'cart') renderCart();
  else if (id === 'wishlist') renderWishlist();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function displayProducts(items) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  const grouped = {};
  items.forEach(p => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  const categoriesToShow = currentCategory === 'All' ? Object.keys(grouped) : [currentCategory];

  categoriesToShow.forEach(cat => {
    const section = document.createElement("div");
    section.innerHTML = `<h3>${cat}</h3><div class="products"></div>`;
    const container = section.querySelector(".products");

    grouped[cat].forEach((item) => {
      const isDress = item.category === "Dresses";
      container.innerHTML += `
        <div class="product ${isDress ? 'dress-small' : ''}">
          <img src="${item.img}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>${item.category}</p>
          <p><strong>Price: ₹${item.price}</strong></p>
          <button class="btn" onclick="addToCart(${products.indexOf(item)})">Add to Cart</button>
          <button class="btn" onclick="addToWishlist(${products.indexOf(item)})">&#9825;</button>
        </div>`;
    });

    list.appendChild(section);
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  displayProducts(products);
}

function searchProducts(str) {
  const filtered = products.filter(p => p.name.toLowerCase().includes(str.toLowerCase()));
  displayProducts(filtered);
}

function addToCart(i) {
  const prod = products[i];
  const found = cart.find(x => x.name === prod.name);
  if (found) found.qty++;
  else cart.push({ ...prod, qty: 1 });
  alert("Added to cart!");
  renderCart();
}

function addToWishlist(i) {
  const prod = products[i];
  if (!wishlist.find(x => x.name === prod.name)) {
    wishlist.push(prod);
    alert("Added to wishlist!");
  } else {
    alert("Already in wishlist.");
  }
  renderWishlist();
}

function renderCart() {
  const ul = document.getElementById("cart-items");
  ul.innerHTML = "";
  if (!cart.length) return ul.innerHTML = "<li>No items in cart.</li>";
  let total = 0;
  cart.forEach((prod, i) => {
    total += prod.price * prod.qty;
    ul.innerHTML += `
      <li>
        ${prod.name} (${prod.category}) - ₹${prod.price} each
        <div class="qty-control">
          <button onclick="changeQty(${i},-1)">−</button>
          <span>${prod.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
        <button class="btn" onclick="removeFromCart(${i})">Remove</button>
      </li>`;
  });
  document.getElementById("cart-total").textContent = `Total: ₹${total}`;
}

function changeQty(i, delta) {
  cart[i].qty += delta;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  renderCart();
}

function removeFromCart(i) {
  cart.splice(i, 1);
  renderCart();
}

function renderWishlist() {
  const ul = document.getElementById("wishlist-items");
  ul.innerHTML = "";
  if (!wishlist.length) return ul.innerHTML = "<li>No items in wishlist.</li>";
  wishlist.forEach((prod, i) => {
    ul.innerHTML += `<li>
      ${prod.name} (${prod.category}) - ₹${prod.price}
      <button class="btn" onclick="addToCart(${products.indexOf(prod)})">Add to Cart</button>
      <button class="btn" onclick="removeFromWishlist(${i})">Remove</button>
    </li>`;
  });
}

function removeFromWishlist(i) {
  wishlist.splice(i, 1);
  renderWishlist();
}

// Initial load
displayProducts(products);
