// EmailJs Initialization
emailjs.init({
    publicKey: "IcIGBPl8CCm4kflMR"
});

// Variables
let cartBody = document.getElementById("cartBody");
let totalPrice = document.getElementById("totalPrice");
let emptyCart = document.getElementById("emptyCart");
let cartTable = document.getElementById("cart-table");
let buttons = document.querySelectorAll(".add-btn");

// Local Storage
let cart = [];
let savedCart = localStorage.getItem("cart");
if (savedCart != null){
    cart = JSON.parse(savedCart);
}

// Update Cart
function updateCart(){
    cartBody.innerHTML = "";
    let total = 0;
    if (cart.length == 0){
        emptyCart.style.display = "block";
        cartTable.style.display = "none";
        localStorage.removeItem("cart");
        
    } 
    
    else {
        emptyCart.style.display = "none";
        cartTable.style.display = "table";
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    for (let i = 0; i < cart.length; i++){
        let row = `
            <tr>
                <td>${i + 1}</td>
                <td>${cart[i].name}</td>
                <td>₹${cart[i].price}</td>
            </tr>
        `;

        cartBody.innerHTML += row;
        total = total + cart[i].price;
    }

    totalPrice.innerHTML = "₹" + total;
    
}

// Add Item / Remove Item
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        let serviceItem = buttons[i].parentElement;
        let serviceName = serviceItem.querySelector(".service-name").innerHTML;
        let servicePrice = Number(buttons[i].dataset.price);
        let found = false;
        let position = -1;

        for (let j = 0; j < cart.length; j++){
            if (cart[j].name == serviceName){
                found = true;
                position = j;
                break;
            }
    }

    if (found == false){
        let service = {
            name: serviceName,
            price: servicePrice
    };

    cart.push(service);
            buttons[i].innerHTML =
                'Remove Item <i class="fa-solid fa-circle-minus"></i>';
            buttons[i].classList.add("remove-btn");

        }

        else {

            cart.splice(position, 1);
            buttons[i].innerHTML =
                'Add Item <i class="fa-solid fa-circle-plus"></i>';

            buttons[i].classList.remove("remove-btn");

        }

        updateCart();

    });

}

// Page Load
updateCart();

for (let i = 0; i < buttons.length; i++){
    let serviceItem = buttons[i].parentElement;
    let serviceName = serviceItem.querySelector(".service-name").innerHTML;

    for (let j = 0; j < cart.length; j++){
        if (cart[j].name == serviceName){
            buttons[i].innerHTML = 'Remove Item <i class="fa-solid fa-circle-minus"></i>';
            buttons[i].classList.add("remove-btn");
        }
    }
}

// Booking Variables
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let bookBtn = document.getElementById("bookBtn");
let successMsg = document.getElementById("successMessage");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");
let cartError = document.getElementById("cartError");


// Book Now Button
bookBtn.addEventListener("click", function(){
    
    // clear old messages
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneError.innerHTML = "";
    cartError.innerHTML = "";
    successMsg.innerHTML = "";

    // Check Cart
    if (cart.length == 0){
        cartError.innerHTML = "Please add at least one service.";
        return;
    }
    
    // Check Name
    if (fullName.value.trim() == ""){
        nameError.innerHTML = "Enter Full Name.";
        return;
    }

    // Check Email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() == "") {
        emailError.innerHTML = "Enter Email Address.";
        return;

    }

    if (emailPattern.test(email.value) == false) {
        emailError.innerHTML = "Enter a valid Email Address.";
        return;

    }
    
    // Check Phone Number
    let phonePattern = /^[0-9]{10}$/;

    if (phone.value.trim() == "") {
        phoneError.innerHTML = "Enter Phone Number.";
        return;

    }

    if (phonePattern.test(phone.value) == false) {
        phoneError.innerHTML = "Enter a valid 10-digit Phone Number.";
        return;

    }

    // Create Service List
    let serviceList = "";
    for (let i = 0; i < cart.length; i++){
        serviceList += cart[i].name + " - ₹" + cart[i].price + "\n";
    }

    // Calculate Total Amount
    let total = 0;
    
    for (let i = 0; i < cart.length; i++){
        total = total + cart[i].price;

    }

    // Email Data
    let params = {
        name: fullName.value,
        email: email.value,
        phone: phone.value,
        services: serviceList,
        amount: total
    };

    // Send Email
    emailjs.send(
       "service_hd5wcoc",
        "template_nr902po",
        params

    )

       .then(function(){
        successMsg.innerHTML = "Thank you For Booking the Services.<br>We will get back to you soon!";

        // Clear Input
        fullName.value = "";
        email.value = "";
        phone.value = "";

        // Clear Cart
        cart = [];
        localStorage.removeItem("cart");
        updateCart();

        // Reset All Buttons
        for (let i = 0; i < buttons.length; i++){
          buttons[i].innerHTML =
                'Add Item <i class="fa-solid fa-circle-plus"></i>';

                buttons[i].classList.remove("remove-btn");

            }

        })

        .catch(function(){
            cartError.innerHTML = 
            "Failed to send email. Please try again.";
        });

});

// Mobile Menu
let menuBtn = document.querySelector(".menu-btn");
let mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", function(){
    mobileMenu.classList.toggle("show");

});

// Hero Book Button
let heroBookBtn = document.querySelector(".book-btn");
heroBookBtn.addEventListener("click", function(){

    let bookingSection = document.getElementById("booking");
    bookingSection.scrollIntoView({
        behavior: "smooth"
    });
});

// Newsletter variables
let newsletterForm = document.getElementById("newsletterForm");
let newsletterName = document.getElementById("newsletterName");
let newsletterEmail = document.getElementById("newsletterEmail");
let newslettermsg = document.getElementById("newsletterMessage");
let newsletterNameError = document.getElementById("newsletterNameError");
let newsletterEmailError = document.getElementById("newsletterEmailError");


// Newsletter Form
newsletterForm.addEventListener("submit", function(event){
    event.preventDefault();

    // Clear old message
    newsletterNameError.innerHTML = "";
    newsletterEmailError.innerHTML = "";
    newslettermsg.innerHTML = "";

    // Check Name
    if (newsletterName.value.trim() == ""){
        newsletterNameError.innerHTML = "Enter Name.";
        return;
    }

    // Check Email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newsletterEmail.value.trim() == ""){
        newsletterEmailError.innerHTML = "Enter Email Address.";
        return;
    }

    if (emailPattern.test(newsletterEmail.value) == false){
        newsletterEmailError.innerHTML = "Enter a valid Email Address.";
        return;
    }

    // Create Data for Emailjs
    let params = {
        name: newsletterName.value,
        email: newsletterEmail.value
    };

    // send email
    emailjs.send(
        "service_hd5wcoc",
        "template_18y778w",
        params
    )

       .then(function(){
        newslettermsg.innerHTML = 
        "Thank you for subscribing to our newsletter!";
        newsletterForm.reset();

       })

       .catch(function(){

        newslettermsg.innerHTML =
        "Subscription failed. Please try again.";

        });

});
