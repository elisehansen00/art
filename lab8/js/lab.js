// Author: ELise Hansen
// Date: 10/29/2024

//Step 1: Create an array of numbers and assign to a variable.
let numbers = [2,4,6,8,10];

// Step 2
function square(x) {
    var results = x * x;
    return results;
}

// Step 3: Test
console.log(square(3)); // = 9
console.log(square(5)); 
console.log(square(7));

// Step 4: Use map with array

var result = numbers.map(square);
console.log("Results using square function: ", result);

// Step 5:
var resultAnon = numbers.map(function(x){
    return x + 5;
});

// Step 6:
console.log("Results using anonymous function: ", resultAnon);
