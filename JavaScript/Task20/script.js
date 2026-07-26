emailjs.init({
    publicKey: "IcIGBPl8CCm4kflMR"
});

const buttons = document.querySelectorAll(".add-btn");
const cartBody = document.getElementById("cartBody");
const totalPrice = document.getElementById("totalPrice");
const emptyCart = document.getElementById("emptyCart");
const cartTable = document.getElementById("cart-table")
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const bookBtn = document.getElementById("bookBtn");
const successMessage = document.getElementById("successMessage");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


buttons.forEach(function(button){

    button.addEventListener("click", () => {

        const serviceItem = button.parentElement;

        const serviceName = serviceItem.querySelector(".service-name").innerText;

        const price = parseInt(button.dataset.price);

        let index = -1;

        for (let i = 0; i < cart.length; i++) {

            if (cart[i].name === serviceName) {
                index = i;
                break;
            }

        }

        if (index === -1) {

            // Add Item
            cart.push({
                name: serviceName,
                price: price
            });

            button.innerHTML =
                'Remove Item <i class="fa-solid fa-circle-minus"></i>';

            button.classList.add("remove-btn");

        } else {

            // Remove Item
            cart.splice(index, 1);

            button.innerHTML =
                'Add Item <i class="fa-solid fa-circle-plus"></i>';

            button.classList.remove("remove-btn");
        }

        updateCart();

    });

});

function updateCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    cartBody.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        emptyCart.style.display = "block";
        cartTable.style.display = "none";

    } else {

        emptyCart.style.display = "none";
        cartTable.style.display = "block";

    }

    for(i=0; i< cart.length; i++)
    {
        total  += cart[i].price;
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

    // Validation
    if (cart.length === 0) {
        alert("Please add at least one service.");
        return;
    }

    if (fullName.value.trim() === "") {
        alert("Enter Full Name");
        return;
    }

    if (email.value.trim() === "") {
        alert("Enter Email");
        return;
    }

    if (phone.value.trim() === "") {
        alert("Enter Phone Number");
        return;
    }

    // Check Email Format

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email.value) === false) {

        alert("Enter a valid Email Address");

        return;

    }

    // Check Phone Number

    const phonePattern = /^[0-9]{10}$/;

    if (phonePattern.test(phone.value) === false) {

        alert("Enter a valid 10-digit Phone Number");

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
    const params = {
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
            updateCart();
            localStorage.removeItem("cart");

            // Reset all buttons
            document.querySelectorAll(".add-btn").forEach(btn => {
                btn.innerHTML = 'Add Item <i class="fa-solid fa-circle-plus"></i>';
                btn.classList.remove("remove-btn");
            });

        })
        .catch(function (error) {
            alert("Failed to send email.");
            console.log(error);
        });

});


// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");

const mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", function () {

    mobileMenu.classList.toggle("show");

});

// Hero Book Button

const heroBookBtn = document.querySelector(".book-btn");

heroBookBtn.addEventListener("click", function () {

    const bookingSection = document.getElementById("booking");

    bookingSection.scrollIntoView({

        behavior: "smooth"

    });

});



// Newsletter

const newsletterForm = document.getElementById("newsletterForm");

const newsletterName = document.getElementById("newsletterName");

const newsletterEmail = document.getElementById("newsletterEmail");

const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (newsletterName.value.trim() === "") {

        alert("Enter Full Name");

        return;

    }

    if (newsletterEmail.value.trim() === "") {

        alert("Enter Email Address");

        return;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(newsletterEmail.value) === false) {

        alert("Enter a valid Email Address");

        return;

    }

    newsletterMessage.innerHTML =
        "Thank you for subscribing to our newsletter!";

    newsletterForm.reset();

});
