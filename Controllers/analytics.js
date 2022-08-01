const Admin = require('../Models/admin');
const Frame = require('../Models/frame');
const Shop = require('../Models/shop');
const Order = require('../Models/order');

var getTotalShops = async () => {
    var totalShops = await Shop.countDocuments();

    return totalShops;
}

var getTotalFrames = async () => {
    var totalFrames = await Frame.countDocuments();

    return totalFrames;
}

var getTotalFrameSold = async () => {
    var totalFrameSold = await Order.countDocuments();

    return totalFrameSold;
}

module.exports = { getTotalShops, getTotalFrames, getTotalFrameSold }