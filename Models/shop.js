const mongoose =  require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter a Email"],
        unique: true,

    },
    password:{
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [8,"Please enter a good password"],
        maxlength: [20,"Password is too long"],
    },
    phone: {
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required:true,
    },
    city:{
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    logoURL: {
        name: {
            type: String,
        },
        data: {
            type: Buffer,
        },
        contentType: String,
        
    },
    ownerName: {
        type: String,
        required: true,
    },
    dateJoined: {
        type: String,
        required: true, 
    },
    timeJoined: {
        type: String,
        required: true, 
    },
    updateDate:{
        type: Date,
        required: true,
    } 
});

const Shop = mongoose.model("Shop",shopSchema);
module.exports = Shop;