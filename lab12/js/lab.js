// Author: Elise Hansen
// Date: 11/12/2024

// credit is heavily due to ChatGPT and our professor Wes Modes !

housesArray = [
  {
      title: "Carrie",
      text: "You are often led by your emotions, seeking validation and acceptance from romantic partners and others. At times, you display self-centered behaviors but can be brought back to reality by your friends. YOur blend of emotional vulnerability, humor, creativity, and daring fashion chops make you a Carrie."
  },
  {
      title: "Miranda",
      text: "You are logical and pragmatic when it comes to all life decisions. Building a steady career and confidence in your intellect and work abilites is paramount to your identity. Learning to let go at times and listen to your heart and be vulnerable might be beneficial to you."
  },
  {
      title: "Charlotte",
      text: "Traditional, polite, and charming, you want nothing more than to be settled comfortably in life. Choosing to let your partners lead, you abide by the ways of the hegemonic cultural norms of your time. You are a loyal friend who is happy to provide comforting advice and enjoy the little things. Being decisive in what you hope to achieve while staying optimistic is what makes you a Charlotte."
  },
  {
      title: "Samantha",
      text: "Bold, charismatic, and witty, you want to be the best and the hottest in any room you walk in. In public and in private, you strive to dominate every area of your life. You are passionate and loyal to your friends and partners and a great communicator. Slowing down to smell the flowers will aid you in being the best Samantha you can be."
  },
  {
      title: "Carranda (Carrie + Miranda)",
      text: "You combine Carrie's emotional vulnerability with Miranda's pragmatism. You can rule your career while still seeking validation of your secret self in your personal life. Letting go of logic while embracing optimism and love will make you truly happy."
  },
  {
      title: "Charlie (Charlotte + Carrie)",
      text: "You truly love to love. Bound by tradition, you believe that your one true love is out there. Loyal, smart, and interested in art, you can embrace romance in any form if you put your mind to it. Shopping and spending an evening at an art gallery opening is your ideal day. You can benefit by channeling your emotions into your creative side and being more attentive to your own feelings rather than being guided by other's opinions."
  },
  {
      title: "Samantie (Samantha + Carrie)",
      text: "A bombastic wit with a gift for gab, you light up every room you walk into. You understand how to carry yourself well and get other's on your side in any debate. Assets such as these can make you overconfident and prone to speaking your mind, for better or for worse. Aim to achieve patience and peace rather than rushing into new things and luring new people, as your charm and drive is very magnetic."
  },
  {
      title: "Miralotte (Miranda + Charlotte)",
      text: "Following the rules and doing things the right way is of the utmost importance to you. You aim to act and appear extremely smart, and often chase professional and social achievements while letting love come to you. You are eager and go-getting, but secretly dreamy and scatterbrained if left to your own structures. Embracing spontaenity and exploring outside of your comfort zone could do wonders for your inner-self."
  },
  {
      title: "Charantha (Charlotte + Samantha)",
      text: "Combining fiery passion with a strong belief in love is a dangerous potion."
  }
]
creditHTML = '<div class="credits"> I wrote most of these but some inspiration credit and wording credit to Carrie Bradshaw page on Wikipedia.</div>';
introHTML = '<div class="stage-direction">The Sorting Hat sings his song:</div>';


// Return Gryffindor, Ravenclaw, Slytherin, and Hufflepuff
// depending on length mod 4
function sortingHatLength(str) {
len = str.length;
mod = len % 4;
if (mod == 0) {
  return "Carrie"
}
else if (mod == 1) {
  return "Miranda"
}
else if (mod == 2) {
  return "Charlotte"
}
else if (mod == 3) {
  return "Samantha"
}
}

// take a string and return a hashed checksum of the string
// from https://stackoverflow.com/questions/26057572/
function checksum(s) {
var hash = 0, strlen = s.length, i, c;
if ( strlen === 0 ) {
  return hash;
}
for ( i = 0; i < strlen; i++ ) {
  c = s.charCodeAt( i );
  hash = ((hash << 5) - hash) + c;
  hash = hash & hash; // Convert to 32bit integer
}
return hash;
};

// Three pure javascript functions to manipulate classes
// from https://stackoverflow.com/questions/6787383/how-to-add-remove-a-class-in-javascript
function hasClass(ele,cls) {
return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
//
function addClass(ele,cls) {
if (!hasClass(ele,cls)) ele.className += " "+cls;
}
//
function removeClass(ele,cls) {
if (hasClass(ele,cls)) {
  var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
  ele.className=ele.className.replace(reg,' ');
}
}

// Given a name, hash the string, and
// return Carrie, Samantha, Charlotte, or Miranda
function sortingHatHash(str) {
checksumValue = checksum(str);
mod = Math.abs(checksumValue) % housesArray.length;
return housesArray[mod];      // returns an object from the array
}

var myButton = document.getElementById("button");
myButton.addEventListener("click", function() {
// get value from input field
var name = document.getElementById("input").value;
// use name to get house from SortingHat function
var houseObj = sortingHatHash(name);
// output to output div (adding some text and HTML around the results)
newText = "<h2>" + houseObj.title + "!</h2>" +
        introHTML +
        "<p>\"" + houseObj.text + "\"</p>" +
        creditHTML;
var outputArea = document.getElementById("output");
outputArea.innerHTML = newText;
removeClass(outputArea, "hidden");
removeClass(document.getElementById("tail-box"), "hidden");
})

var myInput = document.getElementById("input");
myInput.addEventListener("focus", function() {
addClass(document.getElementById("output"), "hidden");
addClass(document.getElementById("tail-box"), "hidden");
});

