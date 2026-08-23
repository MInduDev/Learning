let cart = [];
let total = 0;

let cartBody = document.getElementById("cartBody");
let totalPrice = document.getElementById("totalPrice");
let emptyCart = document.getElementById("emptyCart");

let addButtons = document.querySelectorAll(".add-btn");

let bookBtn = document.getElementById("bookBtn");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let phoneError = document.getElementById("phoneError");
let bookingList = document.getElementById("bookingList");
let successMessage = document.getElementById("successMessage");
let cartError = document.getElementById("cartError");

//email send execution

emailjs.init({
    publicKey: "IcIGBPl8CCm4kflMR"
});


addButtons.forEach(function(button){
    button.addEventListener("click", function(){
        let price = button.getAttribute("data-price");
        let service = button.parentElement.querySelector(".service-name");

        let item = {
            name: service.textContent,
            price: Number(price)
        };

        let alreadyAdded = cart.some(function(item){
            return item.name === service.textContent;
        });

        if (alreadyAdded){
            console.log("Service already added");

            let itemIndex = cart.findIndex(function(cartItem){
                return cartItem.name === service.textContent;
            })

            cart.splice(itemIndex, 1);

            button.innerHTML = 'Add Item <i class="fa-solid fa-circle-plus"></i>';
            button.classList.remove("remove-btn");
        }
        else
            {
                cart.push(item);
                showCart();
                console.log(cart);

                button.innerHTML = 'Remove Item <i class="fa-solid fa-circle-minus"></i>';
                button.classList.add("remove-btn");
            }

            showCart();
    });
});


// Show Cart
function showCart(){
    cartBody.innerHTML = "";
    total = 0;

cart.forEach(function(item, index){
    let row = document.createElement("tr");

    let numberCell = document.createElement("td");
    numberCell.textContent = index + 1;

    let serviceCell = document.createElement("td");
    serviceCell.textContent = item.name;

    let priceCell = document.createElement("td");
    priceCell.textContent = "₹" + item.price;

    total = total + item.price;

    row.appendChild(numberCell);
    row.appendChild(serviceCell);
    row.appendChild(priceCell);

    // let removeCell = document.createElement("td");
    // let removeButton = document.createElement("button");

    // removeButton.textContent = "Remove";
    // removeButton.classList.add("remove-btn");

    // removeButton.addEventListener("click", function(){

    //     let index = cart.findIndex(function(item){
    //         return item.name === serviceCell.textContent;
    //     });

    //     if(index !== -1){
    //         cart.splice(index, 1);
    //         showCart();
    //         console.log(cart);
    //     }
    // });

    // removeCell.appendChild(removeButton);
    // row.appendChild(removeCell);

    cartBody.appendChild(row);
});

if(cart.length === 0){
    emptyCart.style.display = "block";
    document.getElementById("cart-table").style.display = "none";
}
else
    {
        emptyCart.style.display = "none";
        document.getElementById("cart-table").style.display = "table";
    }

    totalPrice.textContent = "₹" + total;
}    

showCart();

// Saved Booking
let savedBooking = localStorage.getItem("booking");

if(savedBooking){
    savedBooking = JSON.parse(savedBooking);

    if(!Array.isArray(savedBooking)){
        savedBooking = [savedBooking];
    }

    console.log(savedBooking);
}
else
{
    savedBooking = [];
}

// show saved booking
savedBooking.forEach(function(booking, index){
    let bookingItem = document.createElement("div");

    bookingItem.innerHTML = `
        <h3>Booking ${index + 1}</h3>
        <p>Name: ${booking.name}</p>
        <p>Email: ${booking.email}</p>
        <p>Phone: ${booking.phone}</p>
        <p>Services:</p>
        <ul>
            ${booking.services.map(function(service){
                return `<li>${service.name} - ₹${service.price}</li>`;
            }).join("")}
        </ul>
        <p>Total: ₹${booking.total}</p>
        <button class="delete-booking-btn">Delete Booking</button>
    `;

    bookingList.appendChild(bookingItem);

    let deleteButton = bookingItem.querySelector(".delete-booking-btn");
    deleteButton.addEventListener("click", function(){

        let index = savedBooking.indexOf(booking);

        if(index !== -1){
            savedBooking.splice(index, 1);
            localStorage.setItem("booking", JSON.stringify(savedBooking));
            bookingItem.remove();
        }

        let bookingItems = bookingList.querySelectorAll("div");

        bookingItems.forEach(function(item, newIndex){
            item.querySelector("h3").textContent = "Booking" + (newIndex +1);
        });
    });
});

// Booking
bookBtn.addEventListener("click", function(){

    let name = fullName.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();

    if(cart.length === 0){
        alert("Please add at least one service before booking");
        return;
    }

    // Name
    if (name === ""){
        nameError.textContent = "Please enter your name";
    }
    else if (!/^[A-Za-z ]+$/.test(name)){
        nameError.textContent = "Please enter a valid name";
    }
    else
    {
        nameError.textContent = "";
    }

    // Email
    if (emailValue === ""){
        emailError.textContent = "Please enter your email";
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)){
        emailError.textContent = "Please enter a valid email";
    }
    else
    {
        emailError.textContent = "";
    }

    // Phone
    if (phoneValue === ""){
        phoneError.textContent = "Please enter your phone number";
    }
    else if (!/^[0-9]{10}$/.test(phoneValue)){
        phoneError.textContent = "Please enter a valid 10-digit phone number";
    }
    else
    {
        phoneError.textContent = "";
    }

    // stop if any validation error
    if (nameError.textContent !== "" ||
        emailError.textContent !== "" ||
        phoneError.textContent !== ""){
            return;
        }

        // success msg
        if (name !== "" && /^[A-Za-z ]+$/.test(name) &&
    emailValue !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue) &&
    phoneValue !== "" && /^[0-9]{10}$/.test(phoneValue)){

        let booking = {
            name: name,
            email: emailValue,
            phone: phoneValue,
            services: cart,
            total: total
        };

        console.log(booking);

        savedBooking.push(booking);
        localStorage.setItem("booking", JSON.stringify(savedBooking));

        // show new booking
        let bookingItem = document.createElement("div");

        bookingItem.innerHTML = `
            <h3>Booking ${savedBooking.length}</h3>
            <p>Name: ${booking.name}</p>
            <p>Email: ${booking.email}</p>
            <p>Phone: ${booking.phone}</p>
            <p>Services:</p>
            <ul>
                ${booking.services.map(function(service){
                    return `<li>${service.name} - ₹${service.price}</li>`;
                }).join("")}
            </ul>
            <p>Total: ₹${booking.total}</p>
            <button class="delete-booking-btn">Delete Booking</button>
        `;

        bookingList.appendChild(bookingItem);

        let servicesText = "";

    for(let i = 0; i < booking.services.length; i++)
    {
        servicesText = servicesText + booking.services[i].name + 
        " - Rs" + booking.services[i].price + "\n";
    }

    let emailData = {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        services: servicesText,
        amount: booking.total
    };

    emailjs.send(
       "service_hd5wcoc",
       "template_nr902po",
        emailData
    )

    .then(function(){
        alert("Booking Successfully!");

        fullName.value = "";
        email.value = "";
        phone.value = "";

        cart = [];
        localStorage.removeItem("cart");
        showCart();

        let allButtons = document.querySelectorAll(".add-btn");

        for(let i = 0; i< allButtons.length; i++)
        {
            allButtons[i].innerHTML = 'Add Item <i class="fa-solid fa-circle-plus"></i>';
            allButtons[i].classList.remove("remove-btn");
        }
        
    })
    .catch(function(){
        cartError.innerHTML = "Failed to send email."
        console.log("Email send failed:", error);
    })

        // delete new booking
        let deleteButton = bookingItem.querySelector(".delete-booking-btn");

        deleteButton.addEventListener("click", function(){
            let index = savedBooking.indexOf(booking);

            if(index !== -1){
                savedBooking.splice(index, 1);
                localStorage.setItem("booking", JSON.stringify(savedBooking));
                bookingItem.remove();
            }

            let bookingItems = bookingList.querySelectorAll("div");

            bookingItems.forEach(function(item, newIndex){
                item.querySelector("h3").textContent = "Booking" + (newIndex + 1);
            });
        });

       
    }
});

// Booking input validation
fullName.addEventListener("input", function(){
    nameError.textContent = "";
});

email.addEventListener("input", function(){
    emailError.textContent = "";
});

phone.addEventListener("input", function(){
    phoneError.textContent = "";
});

// mobile menu
let menuBtn = document.querySelector(".menu-btn");
let mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", function(){
    mobileMenu.classList.toggle("show");
});

// Mobile menu links
let mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(function(link){
    link.addEventListener("click", function(){
        mobileMenu.classList.remove("show");
    });
});

// hero book button
let heroBookButton = document.querySelector(".book-btn");

heroBookButton.addEventListener("click", function(){
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
});


// remove item buttons
let removeButtons = document.querySelectorAll("service-item .remove-btn");

removeButtons.forEach(function(button){
    button.addEventListener("click", function(){
        let service = button.parentElement.querySelector(".service-name");

        let index = cart.findIndex(function(item){
            return item.name === service.textContent;
        });

        if(index !== -1){
            cart.splice(index, 1);
            showCart();
            console.log(cart);
        }
    });
});

// newsletter validation
let newsletterForm = document.getElementById("newsletterForm");
let newsletterName = document.getElementById("newsletterName");
let newsletterEmail = document.getElementById("newsletterEmail");

let newsletterNameError = document.getElementById("newsletterNameError");
let newsletterEmailError = document.getElementById("newsletterEmailError");
let newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", function(event){
    event.preventDefault();

    let newsletterNameValue = newsletterName.value.trim();
    let newsletterEmailValue = newsletterEmail.value.trim();

    newsletterNameError.textContent = "";
    newsletterEmailError.textContent = "";
    newsletterMessage.textContent = "";

    // newsletter name
    if(newsletterNameValue === ""){
        newsletterNameError.textContent = "Please enter your name";
    }
    else if(!/^[A-Za-z ]+$/.test(newsletterNameValue)){
        newsletterNameError.textContent = "Please enter a valid name";
    }

    // newsletter email
    if(newsletterEmailValue === ""){
        newsletterEmailError.textContent = "Please enter your email";
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmailValue)){
        newsletterEmailError.textContent = "Please enter a valid email";
    }

    // stop if any error
    if(newsletterNameError.textContent !== "" ||
       newsletterEmailError.textContent !== ""){
        return;
    }

    

    let newsletterData = {
        name: newsletterNameValue,
        email: newsletterEmailValue
    };

    emailjs.send(
        "service_hd5wcoc",
        "template_18y778w",
        newsletterData
    )

    .then(function(){
     // Newsletter Success

    newsletterMessage.textContent = "Successfully subscribed!";

    newsletterName.value = "";
    newsletterEmail.value = "";
    })

    .catch(function(){
        newsletterMessage.textContent = "Subscription failed.";
        console.log(error);
    })
});




