const mongoose=require('mongoose')
const { Schema } = mongoose;
const studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    marks:{
        type:Number,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    }
  });
  
  module.exports =mongoose.model('Student',studentSchema);