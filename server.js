const mysql=require("mysql");
const express=require("express");
const path=require("path");
const bodyparser = require("body-parser");
const { json } = require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:false}));
var connec=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    password:"root",
    database:"MYJOB"
});
connec.connect(function(err){
    if(err) throw err;
    console.log("connected");
});


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "login.html"));
})
app.get("/newstudent", function(req,res){
    res.sendFile(path.join(__dirname, "newstudent.html"));
})

app.post("/newstudent", (req, res) => {
    console.log("In POST /newstudent")
    console.log(req.body)
    var roll = req.body.roll;
    var name =  req.body.name;
    var course = req.body.course;
    var doa =  req.body.doa;
    var marks = req.body.marks;
    var phno =  req.body.phno
    console.log(roll)
    console.log(name)
    console.log(course)
    console.log(doa)
    console.log(marks)
    console.log(phno)

  
  

  var q = "insert into studentdetails value ("+roll+",'"+name+"', '"+course+"','"+doa+"',"+marks+","+phno+")";
 
    connec.query(q, function(err, result) {
         if(err){
             console.log(err);
         }
         else
         console.log(result);
    });
    res.sendFile(path.join(__dirname, "newstudent.html"));

 });
 
 app.get("/data", function(req, res){
     var results;
     var q = "select * from data";
     connec.query(q, function(err, result){
         res.send(result);
     })
     
 })

app.listen(7887);
console.log("port:7887");