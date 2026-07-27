
emailjs.init({
    publicKey: "IcIGBPl8CCm4kflMR"
});

let buttons = document.querySelectorAll(".add-btn");
let cartBody = document.getElementById("cartBody");
let totalPrice = document.getElementById("totalPrice");
let emptyCart = document.getElementById("emptyCart");
let cartTable = document.getElementById("cart-table")
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let bookBtn = document.getElementById("bookBtn");
let successMessage = document.getElementById("successMessage");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");
let cartError = document.getElementById("cartError");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function () {

        let serviceItem = buttons[i].parentElement;

        let serviceName = serviceItem.querySelector(".service-name").innerText;

        let price = parseInt(buttons[i].dataset.price);

        let index = -1;

        for (let j = 0; j < cart.length; j++) {

            if (cart[j].name === serviceName) {

                index = j;
                break;

            }

        }

        if (index === -1) {

            cart.push({
                name: serviceName,
                price: price
            });

            buttons[i].innerHTML =
                'Remove Item <i class="fa-solid fa-circle-minus"></i>';

            buttons[i].classList.add("remove-btn");

        } else {

            cart.splice(index, 1);

            buttons[i].innerHTML =
                'Add Item <i class="fa-solid fa-circle-plus"></i>';

            buttons[i].classList.remove("remove-btn");

        }

        updateCart();

    });

}

function updateCart() {

   

    cartBody.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartTable.style.display = "none";
        localStorage.removeItem("cart");

    } else {

        emptyCart.style.display = "none";
        cartTable.style.display = "block";
         localStorage.setItem("cart", JSON.stringify(cart));

    }

for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
        cartBody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${cart[i].name}</td>
            <td>₹${cart[i].price}</td>
        </tr>
    `;
    }

    totalPrice.innerText = `₹${total}`;

}


bookBtn.addEventListener("click", function () {

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    cartError.innerHTML = "";
    successMessage.innerHTML = "";

    // Validation
    if (cart.length === 0) {
        cartError.innerHTML = "Please add at least one service.";
        return;
    }

    if (fullName.value.trim() === "") {
        nameError.innerHTML = "Enter Full Name.";
        return;
    }

    // Check Email Format

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        emailError.innerHTML = "Enter Email Address.";

        return;

    }
    else if (emailPattern.test(email.value) === false) {

        emailError.innerHTML = "Enter a valid Email Address.";

        return;

    }

    // Check Phone Number

    let phonePattern = /^[0-9]{10}$/;

    if (phone.value.trim() === "") {

        phoneError.innerHTML = "Enter Phone Number.";

        return;

    }
    else if (phonePattern.test(phone.value) === false) {

        phoneError.innerHTML = "Enter a valid 10-digit Phone Number.";

        return;

    }

    // Convert cart into text
    let services = "";

    for (let i = 0; i < cart.length; i++) {
        services += cart[i].name + " - ₹" + cart[i].price + "\n";
    }

    // Calculate total
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price;
    }

    // Data for EmailJS
    let params = {
        name: fullName.value,
        email: email.value,
        phone: phone.value,
        services: services,
        amount: total
    };

    // Send Email
    emailjs.send(
        "service_hd5wcoc",
        "template_nr902po",
        params
    )
        .then(function () {

            successMessage.innerHTML =
                "Thank you For Booking the Services.<br>We will get back to you soon!";

            // Optional: Clear form
            fullName.value = "";
            email.value = "";
            phone.value = "";

            // Optional: Clear cart
            cart = [];
            localStorage.removeItem("cart");
            updateCart();
            

            // Reset all buttons
            let allButtons = document.querySelectorAll(".add-btn");

            for(let i = 0; i< allButtons.length; i++)
            {
                allButtons[i].innerHTML = 'Add Item <i class="fa-solid fa-circle-plus"></i>';
                allButtons[i].classList.remove("remove-btn");
            }

        })
        .catch(function (error) {
            cartError.innerHTML = "Failed to send email. Please try again.";
            console.log(error);
        });

});


// ===========================
// Mobile Menu
// ===========================

let menuBtn = document.querySelector(".menu-btn");

let mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", function () {

    mobileMenu.classList.toggle("show");

});

// ===========================
// Hero Book Button
// ===========================

let heroBookBtn = document.querySelector(".book-btn");

heroBookBtn.addEventListener("click", function () {

    let bookingSection = document.getElementById("booking");

    bookingSection.scrollIntoView({

        behavior: "smooth"

    });

});

// ===========================
// Newsletter
// ===========================

let newsletterForm = document.getElementById("newsletterForm");
let newsletterName = document.getElementById("newsletterName");
let newsletterEmail = document.getElementById("newsletterEmail");
let newsletterMessage = document.getElementById("newsletterMessage");
let newsletterNameError = document.getElementById("newsletterNameError");
let newsletterEmailError = document.getElementById("newsletterEmailError");

newsletterForm.addEventListener("submit", function (event) {

    newsletterNameError.innerHTML = "";
    newsletterEmailError.innerHTML = "";
    newsletterMessage.innerHTML = "";
    event.preventDefault();

    if (newsletterName.value.trim() == "") {

        newsletterNameError.innerHTML = "Enter Full Name.";

        return;

    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (newsletterEmail.value.trim() === "") {

        newsletterEmailError.innerHTML = "Enter Email Address.";

        return;

    }
    else if (emailPattern.test(newsletterEmail.value) === false) {

        newsletterEmailError.innerHTML = "Enter a valid Email Address.";

        return;

    }

    let params = {
        name: newsletterName.value,
        email: newsletterEmail.value
    };

    emailjs.send(
        "service_hd5wcoc",
        "template_18y778w",
        params
    )
        .then(function () {

            newsletterMessage.innerHTML =
                "Thank you for subscribing to our newsletter!";

            newsletterForm.reset();

        })
        .catch(function () {

            newsletterMessage.innerHTML =
                "Subscription failed. Please try again.";

        });

});


updateCart();

for (let i = 0; i < buttons.length; i++) {

    let serviceItem = buttons[i].parentElement;

    let serviceName = serviceItem.querySelector(".service-name").innerText;

    for (let j = 0; j < cart.length; j++) {

        if (cart[j].name === serviceName) {

            buttons[i].innerHTML =
                'Remove Item <i class="fa-solid fa-circle-minus"></i>';

            buttons[i].classList.add("remove-btn");

        }

    }

}


