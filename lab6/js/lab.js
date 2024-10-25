// Author: ELise Hansen
// Date: 10/24/2024

// Varaibles
myTransport = ["Honda Fit", "Legs", "Bus"];

// Object
myMainRide = { make: "Honda", model: "Fit", color: "Black", year:2015,
  age: function() {
    return 2024 - this.year;
  }
}

//Output
document.writeln("Kinds of transportation I use: ", myTransport, "</br>");
document.writeln("My Main Ride: <pre>", JSON.stringify(myMainRide, null, '\t'), "</pre>");

