const mongoose =  require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter a Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter a Email"],
        unique: true,
        // validate: (value) => {
        //     return validator.isEmail(value)
        //   }
    },
    password:{
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [8,"Please enter a good password"],
        maxlength: [20,"Password is too long"],
    },
  
});

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;