const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const student = require("./models/student");
const cors=require('cors');
const dotenv =require('dotenv');
dotenv.config();

app.use(cors({
  origin:true
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose
  .connect("mongodb+srv://dharanivelkur:dharani@cluster0.nhlwclw.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log("not connected"));

//add a student
app.post("/addStudent", (req, res) => {
  const studen = new student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    gender: req.body.gender,
    marks: req.body.marks,
    section: req.body.section,
    batch: req.body.batch,
  });
  studen
    .save()
    .then(() => res.send("Successfully added"))
    .catch((err) => res.send("Error"));
});


//get a particular student
app.get("/getastudent/:id", (req, res) => {
  let id = req.params.id;
  student
    .findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

//get all students
app.get("/getallstudents", (req, res) => {
  student
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

//delete a particular student
app.delete("/deleteastudent/:id", (req, res) => {
  let id = req.params.id;
  student
    .findByIdAndDelete(id)
    .then(() => res.send("deleted a student successfully!!!"))
    .catch((err) => res.send(err));
});

//get all the students from a particular batch
app.get("/allstudents_batch/:batch", (req, res) => {
  let batch = req.params.batch;
  student
    .find({ batch: batch })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

//update a student details
app.put('/update_student/:id',(req,res)=>{
    let id=req.params.id;
    let {name,age,email,gender,marks,section,batch}=req.body;
    let updated_details={};
    if(name){
        updated_details.name=name;
    }
    if(age){
        updated_details.age=age;
    }
    if(email){
        updated_details.email=email;
    }
    if(gender){
        updated_details.gender=gender;
    }
    if(marks){
        updated_details.marks=marks;
    }
    if(section){
        updated_details.section=section;
    }
    if(batch){
        updated_details.batch=batch;
    }
    student.findByIdAndUpdate(id,{$set:updated_details}).then(()=>res.send("updated successfully")).catch((err)=>res.send("error"))
})

//delete all the student details
app.delete('/deleteAll/:batch',(req,res)=>{
    let batch=req.params.batch;
    student.deleteMany({"batch":batch}).then(()=>{res.send("deleted all the students from particular batch")}).catch((err)=>res.send("error"))
})




app.listen(process.env.port, () => {
  console.log("Server listening on port", process.env.port);
});
