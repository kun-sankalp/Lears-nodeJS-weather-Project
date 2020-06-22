const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  // res.sendFile(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
//console.log("data received");
  console.log(req.body);
  const query = req.body.cityname;
  const apiKey = "c465e5d5b8e0a9681399ffe0d8837a57";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + units;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      //console.log(data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const desc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      console.log(temp);
      console.log(desc);
      res.write("<p>The weather is currently " + desc + "<p>");
      res.write("<h1>The current temperature in " + query + " is: " + temp +" degrees.</h1>" );
      res.write("<img src=" + imageURL + ">");

      res.send();
    })
  })

});






app.listen(3000, function(){
    console.log("server started on port 3000");
  });
