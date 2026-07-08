// Arrow function that returns a Promise
const divideNumbers = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject("Division by zero is not allowed.");
        } else {
            resolve(num1 / num2);
        }
    });
};

// Dummy test cases
const testCases = [
    [10, 2],
    [10, 0],
    [25, 5],
    [100, 4],
    [15, 3]
];

// Run all test cases
testCases.forEach(([num1, num2]) => {
    console.log(`Dividing ${num1} by ${num2}...`);

    divideNumbers(num1, num2)
        .then((result) => {
            console.log("Result:", result);
        })
        .catch((error) => {
            console.log("Error:", error);
        })
        .finally(() => {
            console.log("----------------------");
        });
});
