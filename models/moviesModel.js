import mongoose from "mongoose";

const movieSchema  = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    releaseDate:{
        type: String,
        required: true,
        trim: true,
    },
    duration:{
        type: String,
        required: true,
        trim: true,
    },
    genres:[{
        type:String,
        required: true,
        trim: true
    }],
    language:[{
        type:String,
        required: true,
        trim: true
    }],  
    rating:{
        type: String,
        required: true,
        trim: true,
    },
    industry:{
        type:String,
        required: false,
        trim:true
    },
    top:{
        type:String,
        required:false,
        trmi:true
    },
    tv:{
        type:String,
        required:false,
        trmi:true 
    },
    movies:{
        type:String,
        required:false,
        trmi:true 
    },
    comedies:{
        type:String,
        required:false,
        trmi:true 
    },
    action:{
        type:Boolean,
        required:false,
        trmi:true 
    },
    international:{
        type:Boolean,
        required:false,
        trmi:true 
    },
    documentries:{
        type:String,
        required:false,
        trmi:true 
    },
    europe:{
        type:String,
        required:false,
        trmi:true 
    },
    violent:{
        type:String,
        required:false,
        trmi:true 
    },
    award:{
        type:Boolean,
        required:false,
        trmi:true 
    },
});

const Movies = mongoose.model("Movies", movieSchema)
export {Movies};