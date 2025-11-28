// PRODUCT DATA
const products=[{id:1,name:"Bronze Idol",price:18500,category:"Statues",img:"https://images.unsplash.com/photo-1606312619344-07f6e25c7dbb"},{id:2,name:"Wooden Krishna",price:12000,category:"Statues",img:"https://images.unsplash.com/photo-1592194996308-7b43878e3f53"},{id:3,name:"Brass Ganesha",price:9500,category:"Statues",img:"https://images.unsplash.com/photo-1609687362463-6f2fede9a60e"},{id:4,name:"Roman Coin",price:3200,category:"Coins",img:"https://images.unsplash.com/photo-1617196034796-73b730cdce5a"},{id:5,name:"Old 1 Rupee Coin",price:2800,category:"Coins",img:"https://images.unsplash.com/photo-1599058917212-d750089bc07c"},{id:6,name:"Currency Set",price:4500,category:"Coins",img:"https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b"}];

let cart=JSON.parse(localStorage.getItem("antiquity_cart_v1"))||[];
function saveCart(){localStorage.setItem("antiquity_cart_v1",JSON.stringify(cart))}
function updateCartCount(){const c=document.getElementById("cart-count");if(c)c.textContent=cart.length}
updateCartCount();

function loadProducts(){
const list=document.getElementById("product-list");if(!list)return;
list.innerHTML="";
let search=document.getElementById("search")?.value.toLowerCase()||"";
let category=document.getElementById("category-filter")?.value||"all";
products.filter(p=>category==="all"||p.category===category).filter(p=>p.name.toLowerCase().includes(search)).forEach(p=>{
list.innerHTML+=`<div class="product-card">
<img src="${p.img}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
</div>`})}

if(document.getElementById("product-list"))loadProducts();
if(document.getElementById("search")){
search.oninput=loadProducts;
document.getElementById("category-filter").onchange=loadProducts;
}

function addToCart(id){
const item=products.find(p=>p.id===id);
cart.push(item);saveCart();updateCartCount();alert(item.name+" added to cart!")}

function loadCart(){
const c=document.getElementById("cart-items");if(!c)return;
c.innerHTML="";let total=0;
cart.forEach((item,i)=>{total+=item.price;
c.innerHTML+=`<div class="product-card">
<img src="${item.img}"><h3>${item.name}</h3><p>₹${item.price}</p>
<button class="btn-danger" onclick="removeItem(${i})">Remove</button></div>`});
document.getElementById("cart-total").textContent=total}
if(document.getElementById("cart-items"))loadCart();

function removeItem(i){cart.splice(i,1);saveCart();loadCart();updateCartCount()}
document.getElementById("clear-cart")?.addEventListener("click",()=>{cart=[];saveCart();loadCart();updateCartCount()});

function loadCheckout(){
const c=document.getElementById("checkout-items");if(!c)return;
let total=0;c.innerHTML="";
cart.forEach(item=>{total+=item.price;c.innerHTML+=`<p>${item.name} — ₹${item.price}</p>`});
document.getElementById("checkout-total").textContent=total}
if(document.getElementById("checkout-items"))loadCheckout();

document.getElementById("checkout-form")?.addEventListener("submit",e=>{
e.preventDefault();cart=[];saveCart();window.location.href="thankyou.html"})