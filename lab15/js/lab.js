// Author: Elise Hansen
// Date: 11/25/2024

URL = "https://api.kanye.rest/"

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
        dataType : "json",
    })
    // If the request succeeds
    .done(function(data) {
        console.log(data);
        // make our JSON data printable
        var printableData = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        // put data in webpage
        $("#title").html(data.title)
        $("#output").append("<p>Here's what you should do when you are bored: <b>" + data.activity);
        

    })
});