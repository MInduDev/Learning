# Task 16 - Student Records using HTML & JavaScript
## Objective

The objective of this assignment is to create a web page that displays student records using HTML, CSS, and JavaScript. Student information is displayed in card format, and users can search for students dynamically by name.

## Features

- Display student records using cards
- Store student details in an array of objects
- Render cards dynamically using the `map()` function
- Search students by name using the `filter()` function
- Real-time search while typing
- Responsive card layout

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)

## Student Object Structure

Each student object contains:

- Name
- Marks
- Class
- Address

Example:

```javascript
{
    name: "Riya Sharma",
    marks: "85%",
    class: "10th",
    address: "123, ABC Colony, Delhi"
}
```

## JavaScript Functions Used

### map()

Used to generate student cards dynamically.

```javascript
students.map(...)
```

### filter()

Used to search students based on the entered name.

```javascript
students.filter(...)
```

### addEventListener()

Detects user input in the search box.

```javascript
search.addEventListener("keyup", ...)
```

## Project Structure

```
Task-16-Student-Records/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Download or clone the project.
2. Open the project folder.
3. Open `index.html` in any web browser.
4. Type a student's name into the search box.
5. Matching student records will appear instantly.

## Learning Outcomes

- Arrays of Objects
- DOM Manipulation
- Dynamic HTML Rendering
- map() Function
- filter() Function
- Event Handling
- Real-Time Search
- Responsive Layout
