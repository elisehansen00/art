// index.js - purpose and description here
// Author: Your Name
// Date:

// Constants

// Functions

// this is an example function and this comment tells what it doees and what parameters are passed to it.
function myFunction(param1, param2) {
  // some code here
  // return results;
}

function main() {
  console.log("Main function started.");
  // the code that makes everything happen
}

// let's get this party started
main();
// Get the modal and the close button
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var closeBtn = document.getElementsByClassName("close")[0];

// Get all photos in the gallery
var photos = document.querySelectorAll('.photo');

// When any photo is clicked, open the modal and display the clicked photo
photos.forEach(function(photo) {
  photo.addEventListener("click", function() {
    modal.style.display = "flex";
    modalImg.src = photo.src;
    captionText.innerHTML = photo.alt;
  });
});

// When the close button is clicked, close the modal
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Optional: Close the modal when clicking anywhere outside the modal
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});