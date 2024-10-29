// Author: ELise Hansen
// Date: 10/28/2024

function myVines () {
  var vine = window.prompt("Hello, what kind of grapes would you like to grow on a vine?");
  console.log("vine = ", vine);
// split string to array
  var vineArray = vine.split('');
  console.log("vineArray =", vineArray);
//sort the Array
  var vineArraySort = vineArray.sort();
  console.log("vineArraySort =", vineArraySort);
// join up array
  var vineSorted = vineArraySort.join('');
  console.log("vineSorted = ", vineSorted);
//return
  return vineSorted;
}

//ouput

document.writeln("Oh hey, I grew a new kind of grape: ",
  myVines(), "</br>");