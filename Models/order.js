const mongoose =  require('mongoose');
const {Schema} = mongoose;

const orderSchema = new mongoose.Schema({
    // orderid: {
    //     type: Number,
    //     required: true,
    // },
    shopid: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    custid: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    frameid: {
        type: Schema.Types.ObjectId,
        ref: 'Frame'
    },
    empId: {
        type: Number, required: true,
    },
    date: {
        type: String, required: true,
    },
})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;