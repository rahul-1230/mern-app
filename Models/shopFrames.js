const mongoose = require('mongoose');
const { number } = require('sharp/lib/is');

const frameSchema = new mongoose.Schema({
    modelNumber: {
        type: String,
        required: true,
        //unique: true,
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
    glassType: {
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
    photo: {
        name: {
            type: String,
        },
        data: {
            type: Buffer,
        },
        contentType: String,
        
    },
    uploadDate : {
        type: Date,
        required: true,
    },
    shopid: {
        type: String,
        required: true,
    }
});

frameSchema.index({ modelNumber: 1, shopid: 1 }, { unique: true })
const shopFrame = mongoose.model("shopFrame", frameSchema);
module.exports = shopFrame;