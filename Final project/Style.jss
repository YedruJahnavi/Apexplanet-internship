:root {
  --bg: #fff;
  --text: #111;
  --accent: #ff69b4;
  --card: #f9f9f9;
}
body.dark-mode {
  --bg: #121212;
  --text: #f9f9f9;
  --accent: #ff79c6;
  --card: #1e1e1e;
}
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: var(--bg);
  color: var(--text);
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent);
  padding: 1rem;
  color: white;
  flex-wrap: wrap;
}
nav button {
  margin: 5px;
  padding: 0.5rem;
  background: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
section {
  display: none;
  padding: 1rem;
}
section.active {
  display: block;
}
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}
.product {
  background: var(--card);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s;
}
.product img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}
.btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: 4px;
}
.input {
  padding: 0.5rem;
  width: 80%;
}
.filter-bar {
  margin: 1rem 0;
}
footer {
  text-align: center;
  padding: 1rem;
  background-color: var(--card);
  margin-top: 2rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
.qty-control {
  display: inline-flex;
  gap: 4px;
  align-items: center;
}
.qty-control button {
  width: 24px;
  height: 24px;
  border: none;
  background: var(--accent);
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
#product-list > div {
  margin-bottom: 2rem;
}
#product-list h3 {
  margin: 1rem 0 0.5rem;
  color: var(--accent);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 5px;
}
.product.dress-small {
  transform: scale(0.9);
  font-size: 0.9rem;
}
.product.dress-small img {
  height: 180px;
}
