const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app=express();

app.use(bodyParser.urlencoded({extended:true}) );

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req ,res){
  //main functin
  var firstname=req.body.fname;
  var lastname=req.body.lname;
  var email=req.body.email;
  var data={
    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME:lastname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);
  var option={
    url : "https://us19.api.mailchimp.com/3.0/lists/b92b84071a" ,
    method: "POST",
    headers: {
      "Authorization":"ashu 7310baf8f204c2dc8219b5d0ee5f538c-us19"
    },
    body: jsonData
  };
  request(option,function(error,response,body){
    if(error){
      res.sendFile(__dirname+"/failure.html");

    }else{
      if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
      else {
           res.sendFile(__dirname+"/failure.html");
      }
    }
  });


});

app.post("/failure",function(req,res){
  //failure code
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is runnig on port 3000");
  console.log("hii this is femo");
});


//7310baf8f204c2dc8219b5d0ee5f538c-us19

//b92b84071a
