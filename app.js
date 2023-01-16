const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"public"));

app.listen(3000,function(){
  console.log("the server is running on port 3000");
});

app.get("/",function(req, res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const Firstname = req.body.FirstName;
  const Lastname = req.body.LastName;
  const Email = req.body.Email;
  const data = {
    members:[{
      email_address:Email,
      status: "subscribed",
      merge_fields: {
        FNAME: Firstname,
        LNAME: Lastname
      }
    }
    ]
  };
  const jsonData = JSON.stringify(data);

  const options={
    method: "POST",
    auth: "Alex1:0d0d3ff6e3442c78836a8dc06626826f-us13"
  }

  const url = "https://us13.api.mailchimp.com/3.0/lists/1afe6f8bae";

  const request = https.request(url, options, function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));

      if(response.statusCode===200)
      {
        res.sendFile(__dirname+ "/success.html");
      }
      else{
        res.sendFile(__dirname+ "/failure.html");
      }
    })
  })

request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})


// API KEY

// 0d0d3ff6e3442c78836a8dc06626826f-us13

// List id
// 1afe6f8bae
