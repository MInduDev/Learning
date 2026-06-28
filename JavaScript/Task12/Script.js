// ======================================================================
// Compound Interest Calculation Formula: A = P * (1 + r / n) ^ (n * t)
// ======================================================================

// Sabse 1st Store the given values
let principal = 40000; // Principal Amount
let rate = 0.10; // Annual Interest Rate
let numberOfTimes = 1; // Number of times interest is compounded in one year
let time = 3; // Time in years


// 2nd me Calculate the final amount (A)
let amount = principal * Math.pow((1 + (rate / numberOfTimes)), (numberOfTimes * time));

// 3rd me Calculate Compound Interest - Compound Interest = Final Amount - Principal
let compoundInterest = amount - principal;

//Last me, Display the result in the console
console.log("Principal Amount: " + principal);
console.log("Interest Rate: " + (rate * 100) + "%");
console.log("Time: " + time + " years");
console.log("Compound Interest: " + compoundInterest.toFixed(2));
console.log("Final Amount: " + amount.toFixed(2));
