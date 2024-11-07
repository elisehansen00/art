// Author: Elise Hansen
// Date: 11/06/2024

//  Function for random text

function generateRandomText() {
    const text = "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past, I will turn the inner eye to see its path. Where the fear has gone, there will be nothing. Only I will remain.";
    const min = 3;
    const max = 200;
    const randLen = Math.floor(Math.random() * (max - min + 1)) + min;
    // Get a random starting index to slice the Lorem Ipsum text
    const randStart = Math.floor(Math.random() * (text.length - randLen + 1));
    // Generate the random Lorem Ipsum-like text
    return text.slice(randStart, randStart + randLen);
  }
  
  // click listener for button
  $("#make-convo").click(function(){
    // get new fake dialogue
    const newText = generateRandomText();
  
    // append a new div to our output div
    $("#output").append('<div class="text"><p>' + newText + '</p></div>');
  });