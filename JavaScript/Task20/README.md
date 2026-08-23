# Task 20 - Laundry Service Web Application

A responsive Laundry Service Web Application developed using HTML, CSS, and JavaScript. This project allows users to explore laundry services, add services to the cart, book appointments, and receive order confirmation emails using EmailJS.

---

# Project Objective

The objective of this project is to create a simple and user-friendly laundry service website where users can:

- View available laundry services
- Add or remove services from the cart
- Calculate the total booking amount
- Book laundry services online
- Receive an order confirmation email
- Subscribe to the newsletter

This project was developed as part of Task 20 (JavaScript Project).

---

# Features

## Responsive Navigation Bar

- Logo
- Home
- Services
- About Us
- Contact Us
- Username Button
- Mobile Hamburger Menu

---

## Hero Section

- Attractive heading
- Project description
- Laundry image
- "Book a Service Today" button
- Smooth scrolling to booking section

---

## Services Overview

Displays:

- 15+ Laundry Services
- 240+ Happy Customers
- 2+ Years of Experience

---

## Laundry Services

Users can:

- View available laundry services
- Add items to cart
- Remove items from cart
- See updated button status

Available Services:

- Dry Cleaning
- Wash & Fold
- Ironing
- Stain Removal
- Leather & Suede Care
- Wedding Dress Cleaning

---

## Cart System

- Dynamic cart
- Shows selected services
- Displays total amount
- Stores cart data using Local Storage
- Cart remains after page refresh

---

## Booking Form

Users need to enter:

- Full Name
- Email Address
- Phone Number
- Pickup Date
- Pickup Time
- Address

Validation is applied for:

- Empty fields
- Email format
- Phone number
- Empty cart

---

## Email Confirmation

EmailJS is used to send booking confirmation.

Booking email includes:

- Customer Name
- Email Address
- Phone Number
- Selected Services
- Pickup Date
- Pickup Time
- Address
- Total Amount

After successful booking:

- Success message is displayed
- Form is cleared
- Cart is cleared
- Buttons return to "Add Item"

---

## Quality Section

Highlights:

- Premium Service
- Quick Support
- Hassle Free Delivery
- Affordable Prices

---

## About Us

Provides information about:

- Laundry service
- Premium cleaning
- Fast delivery
- Affordable pricing

---

## Contact Us

Contains:

- Address
- Phone Number
- Email Address
- Working Hours

---

## Newsletter

Users can subscribe by entering:

- Full Name
- Email Address

Validation is applied before subscription.

EmailJS is used for newsletter confirmation.

---

## Footer

Includes:

- Logo
- About Us
- Important Links
- Contact Details
- Social Media Icons
- Copyright

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Font Awesome
- EmailJS
- Local Storage

---

# JavaScript Concepts Used

- Variables
- Functions
- Event Listeners
- DOM Manipulation
- Loops
- Arrays
- Objects
- if...else Statements
- Form Validation
- Regular Expressions
- Local Storage
- JSON.parse()
- JSON.stringify()
- EmailJS Integration

---

# Folder Structure

```
Laundry-Service/
│
├── index.html
├── style.css
├── script.js
├── img.png
└── README.md
```

---

# How to Run

1. Download or clone the project.
2. Open the project folder in VS Code.
3. Make sure all files are in the same folder.
4. Open `index.html` in your browser.
5. Add laundry services to the cart.
6. Fill the booking form.
7. Click **Book Now**.
8. A confirmation email will be sent using EmailJS.

---

# EmailJS Configuration

Before running the project, create an EmailJS account and configure:

- Public Key
- Service ID
- Booking Template ID
- Newsletter Template ID

Update these values inside `script.js` before testing.

---

# Learning Outcomes

During this project I learned:

- Creating responsive web pages
- Working with DOM Manipulation
- Handling user events
- Form validation
- Cart management
- Local Storage
- EmailJS integration
- Responsive web design
- JavaScript project structure

---

# Future Improvements

- Quantity option for services
- Remove individual items from cart table
- Search service feature
- Online payment integration
- Booking history
- Admin dashboard
- Dark mode
- Order tracking
