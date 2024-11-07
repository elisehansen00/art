// Author: Elise Hansen
// Date: 11/06/2024

//  Function for random text
function generateRandomText() {
    const text = "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past, I will turn the inner eye to see its path. Where the fear has gone, there will be nothing. Only I will remain.";
    const min = 3;
    const max = 100;
    const randLen = Math.floor(Math.random() * (max - min + 1)) + min;
    // Get a random starting index to slice the Lorem Ipsum text
    const randStart = Math.floor(Math.random() * (text.length - randLen + 1));
    // Generate the random Lorem Ipsum-like text
    return text.slice(randStart, randStart + randLen);
  }
//  Adding an event listener
$("#make-convo").click(function(){
});
// getting it
const newText = generateRandomText();
// append a new div to our output div
$("#output").append('<div class="text"><p>' + newText + '</p></div>');

  



// Challenge Button
//$("#challenge").append("<button id='button-challenge'>Make Special</button>");
//$("#button-challenge").click(function(){
    // now add (or subtract) the "special" class to the section
    //$("#challenge").toggleClass("special");
//})

// Problem Button
//$("#problem").append("<button id='button-problem'>Make Special</button>");
//$("#button-problem").click(function(){
    // now add (or subtract) the "special" class to the section
    //$("#problem").toggleClass("special");
//})

// Results Button
//$("#results").append("<button id='button-results'>Make Special</button>");
//$("#button-results").click(function(){
    // now add (or subtract) the "special" class to the section
    //$("#results").toggleClass("special");
//})
