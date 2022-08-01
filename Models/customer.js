const mongoose =  require('mongoose');
const {Schema} = mongoose;

const customerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true,  
    },
    phone: {
        type: Number, required: true,    
    },
    address:{
        type: String, required:true,
    },
    city:{
        type: String, required: true,
    },
    profession: String,
    gender:{
        type: String, required: true,
    },
    birthdate:{
        type: String, required: true,
    },
    shopid:{
        type: String, required: true,
    },
    paramsId: {
        type: Schema.Types.ObjectId,
        ref: 'Parameters'
    }
});

const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;