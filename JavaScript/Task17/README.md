# Task 17 - Division Using Promises
## Objective

The objective of this assignment is to create a JavaScript function that performs division using Promises. The function should return the division result when the input is valid and display an error message when division by zero is attempted.

## Features

- Uses an Arrow Function.
- Returns a Promise.
- Resolves the Promise with the division result.
- Rejects the Promise if the second number is zero.
- Handles errors using `.catch()`.
- Uses dummy values for testing.
- Demonstrates at least 5 test cases.

## Files

- `index.js` - JavaScript source code.
- `README.md` - Assignment explanation.

## Test Cases

## Test Cases

- Input: (10, 2) → Output: 5
- Input: (10, 0) → Output: Division by zero is not allowed.
- Input: (25, 5) → Output: 5
- Input: (100, 4) → Output: 25
- Input: (15, 3) → Output: 5

## Sample Output

```
Dividing 10 by 2...
Result: 5
----------------------

Dividing 10 by 0...
Error: Division by zero is not allowed.
----------------------

Dividing 25 by 5...
Result: 5
----------------------

Dividing 100 by 4...
Result: 25
----------------------

Dividing 15 by 3...
Result: 5
----------------------
```

## How to Run

1. Save the JavaScript code as `index.js`.
2. Open the terminal in the project folder.
3. Run the following command:

```
node index.js
```

## Concepts Used

- JavaScript Arrow Function
- Promise
- resolve()
- reject()
- then()
- catch()
- finally()
