const mongoose = require('mongoose');

const parametersSchema = new mongoose.Schema({
    pd : {
        type: Number,
        required: true,
    },
    ph : {
        type: Number,
        required: true,
    },
    tw : {
        type: Number,
        required: true,
    },
    et : {
        type: Number,
        required: true,
    },
    bd : {
        type: Number,
        required: true,
    },
    vd : {
        type: Number,
        required: true,
    },
    pa : {
        type: Number,
        required: true,
    },
    fwa : {
        type: Number,
        required: true,
    },
    res : {
        type: Number,
        required: true,
    },
    rec : {
        type: Number,
        required: true,
    },
    rea : {
        type: Number,
        required: true,
    },
    les : {
        type: Number,
        required: true,
    },
    lec : {
        type: Number,
        required: true,
    },
    lea : {
        type: Number,
        required: true,
    },
});


const Parameters = mongoose.model("Parameters",parametersSchema);
module.exports = Parameters;