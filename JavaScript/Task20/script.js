let cart = [];
let total = 0;


// Get HTML elements

let cartBody = document.getElementById("cartBody");
let totalPrice = document.getElementById("totalPrice");
let emptyCart = document.getElementById("emptyCart");

let addButtons = document.querySelectorAll(".service-btn");

let bookBtn = document.getElementById("bookBtn");

let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");

let bookingMessage = document.getElementById("bookingMessage");


// EmailJS

emailjs.init({
    publicKey: "IcIGBPl8CCm4kflMR"
});


// Hero Book button

let heroBookBtn = document.getElementById("heroBookBtn");

heroBookBtn.addEventListener("click", function () {

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });

});


// Add and Remove buttons

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let serviceName = button.getAttribute("data-name");

        let servicePrice =
            Number(button.getAttribute("data-price"));


        // Check if service is already in cart

        let itemIndex = cart.findIndex(function (item) {

            return item.name === serviceName;

        });


        // If service is already added

        if (itemIndex !== -1) {

            cart.splice(itemIndex, 1);

            button.textContent = "Add Item ⊕";

            button.classList.remove("remove-btn");

            button.classList.add("add-btn");

            showCart();

            return;

        }


        // Add service to cart

        let item = {

            name: serviceName,

            price: servicePrice

        };


        cart.push(item);


        // Change button to Remove Item

        button.textContent = "Remove Item ⊖";

        button.classList.remove("add-btn");

        button.classList.add("remove-btn");


        showCart();

    });

});


// Show Cart

function showCart() {

    cartBody.innerHTML = "";

    total = 0;


    // Empty cart

    if (cart.length === 0) {

        emptyCart.style.display = "block";

    } else {

        emptyCart.style.display = "none";

    }


    // Display cart items

    cart.forEach(function (item, index) {

        let row = document.createElement("tr");


        let serialNumber = document.createElement("td");

        serialNumber.textContent = index + 1;


        let serviceName = document.createElement("td");

        serviceName.textContent = item.name;


        let servicePrice = document.createElement("td");

        servicePrice.textContent = "₹" + item.price;


        row.appendChild(serialNumber);

        row.appendChild(serviceName);

        row.appendChild(servicePrice);


        cartBody.appendChild(row);


        // Calculate total

        total = total + item.price;

    });


    totalPrice.textContent = total;

}


// Name validation

function validateName() {

    let nameValue = fullName.value.trim();


    if (nameValue === "") {

        nameError.textContent =
            "Please enter your name";

        return false;

    }


    if (!/^[A-Za-z ]+$/.test(nameValue)) {

        nameError.textContent =
            "Please enter a valid name";

        return false;

    }


    nameError.textContent = "";

    return true;

}


// Email validation

function validateEmail() {

    let emailValue = email.value.trim();


    if (emailValue === "") {

        emailError.textContent =
            "Please enter your email";

        return false;

    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {

        emailError.textContent =
            "Please enter a valid email";

        return false;

    }


    emailError.textContent = "";

    return true;

}


// Phone validation

function validatePhone() {

    let phoneValue = phone.value.trim();


    if (phoneValue === "") {

        phoneError.textContent =
            "Please enter your phone number";

        return false;

    }


    if (!/^[0-9]{10}$/.test(phoneValue)) {

        phoneError.textContent =
            "Please enter a valid 10-digit phone number";

        return false;

    }


    phoneError.textContent = "";

    return true;

}


// Book Now

bookBtn.addEventListener("click", function () {


    // Check cart

    if (cart.length === 0) {

        alert("Please add at least one service to the cart");

        return;

    }


    // Validate form

    let nameValid = validateName();

    let emailValid = validateEmail();

    let phoneValid = validatePhone();


    if (!nameValid || !emailValid || !phoneValid) {

        return;

    }


    // Disable button while email is sending

    bookBtn.disabled = true;

    bookBtn.textContent = "Sending...";


    // Create booking object

    let booking = {

        name: fullName.value.trim(),

        email: email.value.trim(),

        phone: phone.value.trim(),

        services: cart,

        total: total

    };


    // Get previous bookings

    let savedBookings =
        localStorage.getItem("booking");


    if (savedBookings === null) {

        savedBookings = [];

    } else {

        savedBookings =
            JSON.parse(savedBookings);

    }


    // Add new booking

    savedBookings.push(booking);


    // Save booking

    localStorage.setItem(
        "booking",
        JSON.stringify(savedBookings)
    );


    // Create service details for email

    let serviceDetails = "";


    cart.forEach(function (item) {

        serviceDetails =
            serviceDetails +
            item.name +
            " - ₹" +
            item.price +
            "\n";

    });


    // EmailJS data
let emailData = {

    name: fullName.value.trim(),

    email: email.value.trim(),

    phone: phone.value.trim(),

    services: serviceDetails,

    amount: total

};


    // Send email

    emailjs.send(

        "service_hd5wcoc",

        "template_nr902po",

        emailData

    )

    .then(function () {

        bookingMessage.textContent =
            "Thank you for booking the services. We will get back to you soon!";


        alert("Booking successful!");


        // Reset form

        fullName.value = "";

        email.value = "";

        phone.value = "";


        // Reset cart

        cart = [];

        total = 0;


        // Reset buttons

        addButtons.forEach(function (button) {

            button.textContent = "Add Item ⊕";

            button.classList.remove("remove-btn");

            button.classList.add("add-btn");

        });


        showCart();


        // Enable button

        bookBtn.disabled = false;

        bookBtn.textContent = "Book now";

    })


    .catch(function (error) {

        console.log("Email Error:", error);


        bookingMessage.textContent =
            "Booking saved, but email could not be sent.";


        bookBtn.disabled = false;

        bookBtn.textContent = "Book now";

    });

});


// Newsletter

let newsletterName =
    document.getElementById("newsletterName");

let newsletterEmail =
    document.getElementById("newsletterEmail");

let subscribeBtn =
    document.getElementById("subscribeBtn");

let subscribeMessage =
    document.getElementById("subscribeMessage");


subscribeBtn.addEventListener("click", function () {

    let name =
        newsletterName.value.trim();

    let emailValue =
        newsletterEmail.value.trim();


    if (name === "") {

        subscribeMessage.textContent =
            "Please enter your name";

        return;

    }


    if (!/^[A-Za-z ]+$/.test(name)) {

        subscribeMessage.textContent =
            "Please enter a valid name";

        return;

    }


    if (emailValue === "") {

        subscribeMessage.textContent =
            "Please enter your email";

        return;

    }


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {

        subscribeMessage.textContent =
            "Please enter a valid email";

        return;

    }


    // Save subscriber in localStorage

    let subscribers =
        localStorage.getItem("subscribers");


    if (subscribers === null) {

        subscribers = [];

    } else {

        subscribers =
            JSON.parse(subscribers);

    }


    let subscriber = {

        name: name,

        email: emailValue

    };


    subscribers.push(subscriber);


    localStorage.setItem(
        "subscribers",
        JSON.stringify(subscribers)
    );


    let newsletterData = {

        name: name,

        email: emailValue

    };


    // Send email

    emailjs.send(
        "service_hd5wcoc",
        "template_18y778w",
        newsletterData
    )

    .then(function () {

        subscribeMessage.textContent =
            "Thank you for subscribing!";

        newsletterName.value = "";

        newsletterEmail.value = "";

    })

    .catch(function (error) {

        console.log("Newsletter Email Error:", error);

        subscribeMessage.textContent =
            "Subscribed successfully, but email could not be sent.";

    });


});
