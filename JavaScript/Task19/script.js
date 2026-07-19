// Laundry Services
const services = [
    {
        id: 1,
        name: "Dry Cleaning",
        price: 200,
        image: "images/dry-cleaning.png"
    },

    {
        id: 2,
        name: "Leather & Suede Cleaning",
        price: 400,
        image: "images/leather-cleaning.png"
    },

    {
        id: 3,
        name: "Ironing",
        price: 50,
        image: "images/ironing.png"
    },

    {
        id: 4,
        name: "Wedding Dress Cleaning",
        price: 700,
        image: "images/wedding-cleaning.png"
    },

    {
        id: 5,
        name: "Wash and Fold",
        price: 70,
        image: "images/wash-fold.png"
    },

    {
        id: 6,
        name: "Stain Removal",
        price: 150,
        image: "images/stain-removal.png"
    }
];

// Array
let cart = [];
let skippedServices = [];

// HTML Elements
const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalPrice = document.getElementById("totalPrice");
const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");
const cartBtn = document.getElementById("cartBtn");
const bookNowBtn = document.getElementById("bookNowBtn");
const logoutBtn = document.getElementById("logoutBtn");
const cartSection = document.querySelector(".cart");
const bookingSection = document.querySelector(".booking");

// Form Input
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("Password");

// Display All Services
function showServices(){
    serviceList.innerHTML = "";
    services.forEach(function(service){
        if(skippedServices.includes(service.id)){
            return;
        }

        // Card
        const card = document.createElement("div");
        card.classList.add("service");

        // Image
        const image = document.createElement("img");
        image.src = service.image;
        image.alt = service.name;

        // Name
        const title = document.createElement("h3");
        title.textContent = service.name;

        // Price
        const price = document.createElement("p");
        price.textContent = "₹" + service.price;

        // Button Container
        const buttonBox = document.createElement("div");
        buttonBox.classList.add("buttons");

        // Skip Button
        const skipButton = document.createElement("button");
        skipButton.textContent = "Skip Item";
        skipButton.classList.add("skip");

        // Add Button
        const addButton = document.createElement("button");
        addButton.textContent = "Add Item";
        addButton.classList.add("add");

        // Disable Add Button if already added
        const added = cart.find(function(item){
            return item.id === service.id;
        });

        if(added){
            addButton.disabled = true;
            addButton.textContent = "Added";
        }

        // skip Event
        skipButton.addEventListener("click", function(){
            skipService(service.id);
        });

        // Add Event 
        addButton.addEventListener("click", function(){
            addService(service.id);
        });

        // Append Button
        buttonBox.appendChild(skipButton);
        buttonBox.appendChild(addButton);

        // Append Card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(buttonBox);

        // Append to Service List
        serviceList.appendChild(card);
    });
}


// Add Service To Cart
function addService(id){

    // Check if service is skipped
    if(skippedServices.includes(id)){
        alert("This service has already been skipped.");
        return;
    }

    // Check if Item Already Added
    const alreadyAdded = cart.find(function(item){
        return item.id === id;
    });

    if(alreadyAdded){
        alert("Service is already in the cart.");
        return;
    }

    // Find Selected Service
    const selectedService = services.find(function(service){
        return service.id === id;
    });

    if(!selectedService){
        return;
    }

    // Add to Cart
    cart.push(selectedService);

    // save Cart
    saveCart();

    // Refresh Cart
    updateCart();

    // Show Service
    showServices();
}

// Save Cart
function saveCart(){
    localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("skippedServices", JSON.stringify(skippedServices));
}

// Load Cart
function loadCart(){
    const savedCart = localStorage.getItem("cartItems");
    const savedSkipped = localStorage.getItem("skippedServices");

    if(savedCart){
        cart = JSON.parse(savedCart);
    }

    if(savedSkipped){
        skippedServices = JSON.parse(savedSkipped);
    }

    updateCart();
    showServices();
}


// Skip Service
function skipService(id){
    
    // Confirmation
    if(!confirm("Skip this service permanently?")){
        return;
    }
    
    //Check if already Skipped
    if(skippedServices.includes(id)){
        return;
    } 

    // Save Skipped Service Id
    skippedServices.push(id);

    // Remove from cart if already added
    cart = cart.filter(function(item){
        return item.id !== id;
    });

    // Save update cart
    saveCart();

    // Refresh page data
    showServices();
    updateCart();
}


// Update Cart
function updateCart(){

    // Clear old rows
    cartItems.innerHTML = "";
    let total = 0;

    // Empty cart
    if(cart.length === 0){
        emptyCart.style.display = "block";
    }
    else{
        emptyCart.style.display = "none";
    }

    // Create Rows
    cart.forEach(function(service,index){
        total += service.price;
        const row = document.createElement("tr");

        // Serial Number
        const number = document.createElement("td");
        number.textContent = index + 1;

        // Service Name 
        const serviceName = document.createElement("td");
        serviceName.textContent = service.name;

        // Price
        const price = document.createElement("td");
        price.textContent = "₹" + service.price;

        // Remove Button Cell
        const removCell = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        // Remove Event
        removeBtn.addEventListener("click", function(){
            removeService(index);
        });

        removCell.appendChild(removeBtn);

        // Append data
        row.appendChild(number);
        row.appendChild(serviceName);
        row.appendChild(price);
        row.appendChild(removCell);

        cartItems.appendChild(row);
    });

    // Update Total
    totalPrice.textContent = "₹" + total;
}

// Remove Service
function removeService(index){

    if(!confirm("Remove this service?")){
        return;
    }
    cart.splice(index,1);
    saveCart();
    updateCart();
    showServices();
}

// View Cart Button
cartBtn.addEventListener("click",function(){
    cartSection.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });
});

// Go to booking button
bookNowBtn.addEventListener("click",function(){
    bookingSection.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });
});

// Booking form submit
bookingForm.addEventListener("submit",function(event){
    event.preventDefault();

    // Validate cart
    if(cart.length === 0){
        message.style.color = "red";
        message.textContent = "Please add at least one service before booking.";
        return;
    }

    // Validate inputs
    if(fullName.value.trim() === ""){
        message.style.color = "red";
        message.textContent = "Please enter your full name.";
        fullName.focus();
        return;
    }

    // Email empty
    if(email.value.trim() === ""){
        message.style.color = "red";
        message.textContent = "Please enter your email.";
        email.focus();
        return;
    }

    // Email format validation
    if(!email.value.includes("@") || !email.value.includes(".")){
        message.style.color = "red";
        message.textContent = "Please enter a valid email.";
        email.focus();
        return;
    }

    // Password empty 
    if(password.value.trim() === ""){
        message.style.color = "red";
        message.textContent = "Please enter your password.";
        password.focus();
        return;
    }

    // Password length validation
    if(password.value.length < 6){
        message.style.color = "red";
        message.textContent = "Password should contain at least 6 characters.";
        password.focus();
        return;
    }

    // Success message
    message.style.color = "green";
    message.textContent = "Thank you! Your service booking has been submitted successfully.";

    // Clear cart
    cart = [];

    // Save update cart
    saveCart();

    // Update UI
    updateCart();
    showServices();

    // Clear form
    bookingForm.reset();
});

// Logout button
logoutBtn.addEventListener("click",function(){
    localStorage.removeItem("cartItems");
    localStorage.removeItem("skippedServices");
    location.reload();
});

// Load saved data on page load
loadCart();
