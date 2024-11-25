// Author: Elise Hansen
// Date: 11/25/2024


//URL = "https://www.boredapi.com/api/activity/"
// URL = "https://api.kanye.rest/"
//URL = "https://api.whatdoestrumpthink.com/api/v1/quotes/random"
URL = "https://api.api-ninjas.com/v1/quotes?category=dating"

// attach click action to button
$('#button').click(function(){
    // get data via ajax from numbersapi
    // Using the core $.ajax() method
    $.ajax({
        // The URL for the request (ENDPOINT)
        url: URL,
        // The data to send (will be converted to a query string)
        // data: { api_key: RgNBs4TjYNVjwPSQLLvkMtIj4zOflKWVB3TikTry},
        // Whether this is a POST or GET request
        type: "GET",
        // The type of data we expect back
        // dataType : "json",
    })
    // If the request succeeds
    .done(function(data) {
        console.log(data);
        // make our JSON data printable
        var printableData = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        // put data in webpage
        // $("#output").append("<p>" + JSON.stringify(data));
        // $("#output").append("<p>Here's what you should do when you are bored: <b>" + data.activity);
        // $("#output").append(printableData);
        // $("#output").append("<p>The most stable smart man in the room says: <b>" + data.quote);
        $("#title").html(data.title)
        $("#output").append("<p>" + data.explanation);

    })
});