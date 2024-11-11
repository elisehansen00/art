// Author: Elise Hansen
// Date: 11/11/2024

// Generates an anagram of a given string.
// credit to ChatGPT and Wes Modes
function anagram(inputString) {
  // Convert the string to an array of characters
  const charArray = inputString.split('');
 
  // algorithm to shuffle the characters
  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }
 
  // shuffled characters back into the string
  const anagram = charArray.join('');
 
  // returning the generated anagram
  return anagram;
 }
 
 // given a string, return string in Title Case
 // credit to ChatGPT
 String.prototype.toTitleCase = function() {
   return this.replace(/\w\S*/g, function(txt) {
     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
   });
 };
 
 // Sorts the characters of a string in alphabetical order.
 function sortString(inputString) {
     return inputString.split('').sort().join('');
 }
 
 // click listener for button
 $("#submit").click(function(){
     // get value of input field
     const userName = $("#user-name").val();
     // now let's sort it outtttt
     newName = anagram(userName).toTitleCase();
     // append a new div to our output div
     $("#output").html('<div class="name-results">' + newName + '</div>');
 });