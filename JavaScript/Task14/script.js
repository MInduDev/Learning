// 1. sum of first n numbers
let n = 10;
let sum = 0;

for (let i = 1; i <= n; i++) {
    sum = sum + i;
}
console.log("Sum of first" + n + "numbers = " + sum);


// 2. Table of a number
let table = 5;

for (let i = 1; i <= 10; i++) {
    console.log(table + " x " + i + " = " + table * i);
}


// 3. Prime Number

let prime = 7;
let check = true;

for (let i = 2; i < prime; i++) {
    if (prime % i == 0) {
        check = false;
    }
}

if (check) {
    console.log(prime + " is Prime Number");
} else {
    console.log(prime + " is Not Prime Number");
}


// 4. Factors of a Number

let n1 = 13;

for(let i = 1; i <= n1; i++){
    if(n1 % i == 0){
        console.log(i);
    }
}


// 5. Sum of Digits

let num = 153;
let total = 0;

while (num > 0) {
    total = total + (num % 10);
    num = Math.floor(num / 10);
}

console.log("Sum of Digits = " + total);


// 6. Armstrong Number

let arm = 153;
let temp = arm;
let result = 0;

while (temp > 0) {
    let digit = temp % 10;
    result = result + digit * digit * digit;
    temp = Math.floor(temp / 10);
}

if (result == arm) {
    console.log(arm + " Yes");
} else {
    console.log(arm + " No");
}

