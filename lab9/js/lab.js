// Author: Elise Hansen
// Date: 10/29/2024

// using jQuery to create a program

// Challenge Button
$("challenge").append("<button id='button-challenge'>Make Special</button>");
$("button-challenge").click(function(){
    // now add (or subtract) the "special" class to the section
    $("challenge").toggleClass("special");
});

// Problem Button
$("problem").append("<button id='button-problem'>Make Special</button>");
$("button-problem").click(function(){
    // now add (or subtract) the "special" class to the section
    $("problem").toggleClass("special");
});

// Results Button
$("results").append("<button id='button-results'>Make Special</button>");
$("button-results").click(function(){
    // now add (or subtract) the "special" class to the section
    $("results").toggleClass("special");
});
