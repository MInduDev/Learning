// DOM Selection
const serviceContainer = document.getElementById("serviceContainer");

const cartBody = document.getElementById("cartBody");
const emptyRow = document.getElementById("emptyRow");
const totalPrice = document.getElementById("totalPrice");

const logoutBtn = document.getElementById("logout");

const bookingForm = document.getElementById("bookingForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

const bookBtn = document.getElementById("bookBtn");


// Variables
let cartItems = [];
let total = 0;

let currentIndex = 0;


// Services Data
const services = [

    {
        id: 1,
        name: "Dry Cleaning",
        price: 200,
        image: "Images/dry-cleaning.png"
    },

    {
        id: 2,
        name: "Leather & Suede Cleaning",
        price: 999,
        image: "Images/leather-cleaning.png"
    },

    {
        id: 3,
        name: "Ironing",
        price: 50,
        image: "Images/ironing.png"
    },

    {
        id: 4,
        name: "Wedding Dress Cleaning",
        price: 700,
        image: "Images/wedding-cleaning.png"
    },

    {
        id: 5,
        name: "Wash and Fold",
        price: 70,
        image: "Images/wash-fold.png"
    },

    {
        id: 6,
        name: "Stain Removal",
        price: 150,
        image: "Images/stain-removal.png"
    }

];


// Show Current Service
function showServices(){

    serviceContainer.innerHTML = "";

    if(currentIndex >= services.length){

        serviceContainer.innerHTML = `

        <div class="empty-service">

            <i class="fa-solid fa-circle-check"></i>

            <h2>No More Services</h2>

            <p>All available services have been viewed.</p>

        </div>

        `;

        return;
    }

    let service = services[currentIndex];

    let card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `

        <img src="${service.image}" alt="${service.name}">

        <h3>${service.name}</h3>

        <h4>₹${service.price.toFixed(2)}</h4>

        <div class="btn-box">

            <button class="skip-btn">
                Skip Item
            </button>

            <button
                class="add-btn"
                data-id="${service.id}">
                Add Item
            </button>

        </div>

    `;

    serviceContainer.appendChild(card);

    const addButton = card.querySelector(".add-btn");
    const skipButton = card.querySelector(".skip-btn");


    addButton.addEventListener("click", function(){

        addService(service);

    });


    skipButton.addEventListener("click", function(){

        skipService();

    });

}


// Add Service
function addService(service){

    cartItems.push(service);

    showCart();
    updateTotal();

    currentIndex++;

    showServices();

}


// Skip Service
function skipService(){

    currentIndex++;

    showServices();

}


// Show Cart
function showCart(){

    cartBody.innerHTML = "";

    if(cartItems.length === 0){

        cartBody.appendChild(emptyRow);

        return;

    }

    cartItems.forEach(function(item,index){

        let row = document.createElement("tr");

        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${item.name}</td>

            <td>₹${item.price.toFixed(2)}</td>

        `;

        cartBody.appendChild(row);

    });

}


// Update Total
function updateTotal(){

    total = 0;

    cartItems.forEach(function(item){

        total += item.price;

    });

    totalPrice.innerText = total.toFixed(2);

    updateBookButton();

}


// Update Book Button State
function updateBookButton(){

    if(cartItems.length === 0){

        bookBtn.disabled = true;
        message.style.color = "red";
        message.innerText = "Add the items to the cart to book";

    } else {

        bookBtn.disabled = false;
        message.innerText = "";

    }

}


// Logout
logoutBtn.addEventListener("click", function(){

    let logout = confirm("Are you sure you want to logout?");

    if(logout){

        alert("Logout Successful.");

        location.reload();

    }

});


// Booking Form
bookingForm.addEventListener("submit", function(event){

    event.preventDefault();

    message.innerText = "";
    message.style.color = "red";


    // Cart Validation
    if(cartItems.length === 0){

        message.innerText = "Please add at least one service.";
        return;

    }


    // Name Validation
    if(fullName.value.trim() === ""){

        message.innerText = "Please enter your full name.";

        fullName.focus();

        return;

    }


    // Email Validation
    if(email.value.trim() === ""){

        message.innerText = "Please enter your email.";

        email.focus();

        return;

    }


    // Phone Validation
    if(phone.value.trim() === ""){

        message.innerText = "Please enter your phone number.";

        phone.focus();

        return;

    }


    // Success
    message.style.color = "green";

    message.innerText = "Booking Successful!";

    alert("Your booking has been placed successfully.");



    // Reset Form
    bookingForm.reset();



    // Clear Cart
    cartItems = [];

    total = 0;

    showCart();

    updateTotal();



    // Restart Services
    currentIndex = 0;

    showServices();

});

// Initial Load
showCart();

updateTotal();

showServices();
