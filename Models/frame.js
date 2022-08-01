const mongoose = require('mongoose');
const { number } = require('sharp/lib/is');

const frameSchema = new mongoose.Schema({
    modelNumber: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    frameType: {
        type: String,
        required: true, 
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true, 
    },
    price:{
        type: Number,
        required: true,
    },
    material:{
        type: String,
        required: true,
    },
    shape: {
        type: String,
        required: true,
    },
    weightGroup:{
        type: String,
        required: true,
    },
    // dimension: {
    //     type: String,
    //     required: true,
    // },
    width: {
        type: Number,
        required: true,
    }, 
    SVphoto: {
        name: {
            type: String,
        },
        data: {
            type: Buffer,
        },
        contentType: String,    
    },
    FVphoto: {
        name: {
            type: String,
        },
        data: {
            type: Buffer,
        },
        contentType: String,    
    },
    AVphoto: {
        name: {
            type: String,
        },
        data: {
            type: Buffer,
        },
        contentType: String,    
    },
    sells: {
        type: Number,
        default: 0,
    },
    uploadDate : {
        type: Date,
        required: true,
    },
});

const Frame = mongoose.model("Frame", frameSchema);
module.exports = Frame;