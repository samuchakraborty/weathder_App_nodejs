
const express = require("express");
const https = require("https");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
//res.send("hello");
 
});
   
app.post("/", function(req, res){

console.log(req.body.CityName);
const apiKey = "fa14bcab0d873910e99647623b8101d7"
    const query = req.body.CityName;
const units = "metric"
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

https.get(url, function (response) {
    //console.log(response.body);

    response.on('data', function (data) {

        //console.log(data);
        const weatherData = JSON.parse(data);
        //console.log(weatherData);
        const temp = weatherData.main.temp
        const icon = weatherData.weather[0].icon
        console.log(icon);
        const weatherUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(weatherUrl);
        res.write("<p>The weather is currently  " +
            weatherData.weather[0].description + "  </p>"

        )
        res.write("<h1> The current temperature in "+query+ " is " + temp + " </h1>")
        res.write("<img src= " + weatherUrl + "></img>")

        res.send()


    })

})



})






app.listen(port, function () {

    console.log("the server is started at  " + port);

});