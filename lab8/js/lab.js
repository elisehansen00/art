// Author: ELise Hansen
// Date: 10/29/2024

// function
function yourUnluckyNumber(x) {
    return (x + 13 == 0);
}

//test
console.log("Is this lucky? ", isEven(1));
console.log("Is this lucky? ", isEven(2));

array = [99, 13, 4, 22, 44, 69, 88]
console.log("My array", array);

var result = array.map(isEven);
console.log("Test of luckiness of array: ", result);

var result = array.map(function(x){
    return x % 7;

})

console.log("New unlucky numbers: ", result);
