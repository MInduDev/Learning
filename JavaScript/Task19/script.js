// DOM Selection
const serviceContainer = document.getElementById("serviceContainer");

const cartBody = document.getElementById("cartBody");
const emptyRow = document.getElementById("emptyRow");
const totalPrice = document.getElementById("totalPrice");

const logoutBtn = document.getElementById("logout");

const bookingForm = document.getElementById("bookingForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
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
function showCurrentService() {

    serviceContainer.innerHTML = "";

    if (currentIndex >= services.length) {

        let message = "";

        message += '<div class="empty-service">';
        message += '<i class="fa-solid fa-circle-check"></i>';
        message += '<h2>No More Services</h2>';
        message += '<p>All available services have been viewed.</p>';
        message += '</div>';

        serviceContainer.innerHTML = message;

        return;
    }

   
    let currentService = services[currentIndex];

    let serviceCard  = document.createElement("div");
    serviceCard .className = "service-card";

    let html = "";

    html += '<img src="' + currentService.image + '">';
    html += '<h3>' + currentService.name + '</h3>';
    html += '<h4>₹' + currentService.price + '</h4>';

    html += '<div class="btn-box">';

    html += '<button class="skip-btn">';
    html += 'Skip Item';
    html += '</button>';

    html += '<button class="add-btn">';
    html += 'Add Item';
    html += '</button>';

    html += '</div>';

    serviceCard .innerHTML = html;

    serviceContainer.appendChild(serviceCard );

    const addButton = serviceCard .querySelector(".add-btn");
    const skipButton = serviceCard .querySelector(".skip-btn");


    addButton.addEventListener("click", function () {

        addService(currentService);

    });


    skipButton.addEventListener("click", function () {

        skipService();

    });

}


// Add Service
function addService(service) {
    cartItems.push(service);

    showCart();
    updateTotal();

    currentIndex++;

    showCurrentService();

}


// Skip Service
function skipService() {

    currentIndex++;

    showCurrentService();

}


// Show Cart
function showCart() {
    cartBody.innerHTML = "";

    if (cartItems.length === 0) {

        cartBody.appendChild(emptyRow);

        return;

    }

    for(let i =0; i< cartItems.length; i++)
    {
        let row = document.createElement("tr");

        let html = "";

        html += "<td>";
        html += i + 1;
        html += "</td>";

        html += "<td>";
        html += cartItems[i].name;
        html += "</td>";

        html += "<td>";
        html += "₹" + cartItems[i].price;
        html += "</td>";

        row.innerHTML = html;

        cartBody.appendChild(row);
    }

}


// Update Total
function updateTotal() {
    total = 0;

    for(let i = 0; i< cartItems.length; i++)
    {
        total = total + cartItems[i].price;
    }

    totalPrice.innerText = total;

    updateBookButton();

}


// Update Book Button State
function updateBookButton() {

    if (cartItems.length === 0) {

        bookBtn.disabled = true;
        message.style.color = "red";
        message.innerText = "Add the items to the cart to book";

    } else {

        bookBtn.disabled = false;
        message.innerText = "";

    }

}


// Logout
logoutBtn.addEventListener("click", function () {
    let logout = confirm("Are you sure you want to logout?");

    if (logout) {

        alert("Logout Successful.");

        location.reload();

    }

});


// Booking Form
bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    message.innerText = "";
    message.style.color = "red";


   // Check cart
    if (cartItems.length === 0) {

        message.innerText = "Please add at least one service.";
        return;

    }


   // Check name
    if (fullName.value === "") {
        message.innerText = "Please enter your full name.";
        fullName.focus();
        return;
    }

    //  Check email   
    if (email.value === "") {
        message.innerText = "Please enter your email.";
        email.focus();
        return;
    }

    if(password.value === ""){
        message.innerText = "please enter your password.";
        password.focus;
        return;
    }


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
    showCurrentService();

});

// Initial Load
showCart();
updateTotal();
showCurrentService();
