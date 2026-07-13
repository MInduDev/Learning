// Services Array + Variables + Load Services

const services=[
    {
        id:1,
        name:"Dry Cleaning",
        price:200,
        image:"images/dry-cleaning.jpg"
    },
    {
        id:2,
        name:"Leather & Suede Cleaning",
        price:150,
        image:"images/leather-suede.jpg"
    },
    {
        id:3,
        name:"ironing",
        price:30,
        image:"images/ironing.jpg"
    },
    {
        id:4,
        name:"Wedding Dress Cleaning",
        price:30,
        image:"images/wedding-dress.jpg"
    },
    {
        id:5,
        name:"Was and Fold",
        price:30,
        image:"images/wash-fold.png"
    },
    {
        id:6,
        name:"Stain Removal",
        price:30,
        image:"images/stain-removal.jpg"
    }
];

let cart=[];

const serviceList=document.getElementById("serviceList");
const cartItems=document.getElementById("cartItems");
const total=document.getElementById("total");
const emptyCart=document.getElementById("emptyCart");

const bookingForm=document.getElementById("bookingForm");
const message=document.getElementById("message");
const cartBtn=document.getElementById("cartBtn");
const bookNowBtn=document.getElementById("bookNowBtn");

function showServices(){

serviceList.innerHTML="";

for(let i=0;i<services.length;i++){

let card=document.createElement("div");
card.className="service-card";

card.innerHTML=`
<img src="${services[i].image}" alt="${services[i].name}">

<h3>${services[i].name}</h3>

<p>₹${services[i].price}</p>

<div class="card-btns">
<button class="skip-btn" onclick="skipItem(${services[i].id})">
Skip Item
</button>

<button class="add-btn" onclick="addItem(${services[i].id})">
Add Item
</button>
</div>
`;

serviceList.appendChild(card);

}

}

function skipItem(id){

let card=document.querySelectorAll(".service-card");

for(let i=0;i<services.length;i++){

if(services[i].id==id){
card[i].style.display="none";
break;
}

}

}

// Add Item + Remove Item + Update Cart

function addItem(id){

for(let i=0;i<services.length;i++){

if(services[i].id==id){

cart.push(services[i]);
saveCart();
updateCart();

break;

}

}

}

function removeItem(index){

cart.splice(index,1);

saveCart();
updateCart();

}

function updateCart(){

cartItems.innerHTML="";

let totalAmount=0;

if(cart.length==0){

emptyCart.style.display="block";

}else{

emptyCart.style.display="none";

}

for(let i=0;i<cart.length;i++){

let row=document.createElement("tr");

totalAmount=totalAmount+cart[i].price;

row.innerHTML=`
<td>${i+1}</td>
<td>${cart[i].name}</td>
<td>₹${cart[i].price}</td>
<td>
<button onclick="removeItem(${i})">
<i class="fa-solid fa-trash"></i>
</button>
</td>
`;

cartItems.appendChild(row);

}

total.innerHTML="₹"+totalAmount;

}


// localStorage + Total + Page Loal

function saveCart(){

localStorage.setItem("cartItems",JSON.stringify(cart));

}

function loadCart(){

let data=localStorage.getItem("cartItems");

if(data!=null){

cart=JSON.parse(data);

}

updateCart();

}

cartBtn.addEventListener("click",function(){

if(cart.length==0){

alert("Please add at least one service first.");
return;

}

alert("Your selected services are already added to the cart.");

});

bookNowBtn.addEventListener("click",function(){

document.getElementById("name").focus();

});

showServices();
loadCart();

// Booking Form + Buttons + Final Initialization

bookingForm.addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value.trim();
let email=document.getElementById("email").value.trim();
let password=document.getElementById("password").value.trim();

if(cart.length==0){
message.style.color="red";
message.innerHTML="Please add at least one service.";
return;
}

if(name==""||email==""||password==""){
message.style.color="red";
message.innerHTML="Please fill all fields.";
return;
}

message.style.color="green";
message.innerHTML="Booking completed successfully.";

bookingForm.reset();

cart=[];
saveCart();
updateCart();

});

document.getElementById("logoutBtn").addEventListener("click",function(){

alert("Logout Successful");

});

showServices();
loadCart();
