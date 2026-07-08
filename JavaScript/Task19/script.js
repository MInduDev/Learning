// Service Data

const services = [
    {
        name: "Dry Cleaning",
        price: 200,
        image: "images/dry-cleaning.png"
    },
    {
        name: "Leather & Suede Cleaning",
        price: 999,
        image: "images/leather-cleaning.png"
    },
    {
        name: "Ironing",
        price: 30,
        image: "images/ironing.png"
    },
    {
        name: "Wedding Dress Cleaning",
        price: 2400,
        image: "images/wedding-cleaning.png"
    },
    {
        name: "Wash And Fold",
        price: 140,
        image: "images/wash-fold.png"
    },
    {
        name: "Stain Removal",
        price: 500,
        image: "images/stain-removal.png"
    }
];


// Variables

let currentIndex = 0;
let cart = [];
let total = 0;


// Select Elements

const serviceImage = document.getElementById("serviceImage");
const serviceName = document.getElementById("serviceName");
const servicePrice = document.getElementById("servicePrice");

const addBtn = document.getElementById("addBtn");
const skipBtn = document.getElementById("skipBtn");

const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const emptyCart = document.getElementById("emptyCart");

const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");


// Show Current Service

function showService() {

    if (currentIndex >= services.length) {

        serviceImage.src = "";
        serviceName.innerHTML = "No More Services";
        servicePrice.innerHTML = "";

        addBtn.disabled = true;
        skipBtn.disabled = true;

        return;
    }

    serviceImage.src = services[currentIndex].image;
    serviceName.innerHTML = services[currentIndex].name;
    servicePrice.innerHTML = "₹" + services[currentIndex].price + ".00";
}


// Add Item

addBtn.addEventListener("click", function () {

    let service = services[currentIndex];

    cart.push(service);

    total = total + service.price;

    updateCart();

    currentIndex++;

    showService();

});


// Skip Item

skipBtn.addEventListener("click", function () {

    currentIndex++;

    showService();

});


// Update Cart

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length == 0) {

        emptyCart.style.display = "block";

    } else {

        emptyCart.style.display = "none";

    }

    for (let i = 0; i < cart.length; i++) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${cart[i].name}</td>
            <td>₹${cart[i].price}.00</td>
        `;

        cartItems.appendChild(row);

    }

    totalAmount.innerHTML = "₹ " + total + ".00";

}


// Booking Form

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (cart.length == 0) {

        message.style.color = "red";
        message.innerHTML = "❌ Add items to the cart first.";

        return;
    }

    if (name == "" || email == "" || password == "") {

        message.style.color = "red";
        message.innerHTML = "❌ Please fill all fields.";

        return;
    }

    message.style.color = "green";
    message.innerHTML = "✅ Thank you for contacting us. We will get back to you soon.";

    bookingForm.reset();

});

// First Service

showService();
