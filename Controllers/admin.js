// packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const sharp = require('sharp');
// Models
const shops = require('./shop');
const Admin = require('../Models/admin');
const Frame = require('../Models/frame');
const Shop = require('../Models/shop');
const Order = require('../Models/order');
const Parameters = require('../Models/parameters');

// for redirect 
const url = require('url');
// crud ops
const frameController = require('./frame');


//const req = require('express/lib/request');


// exports.myprofile = (req,res,next) => {

        
//        // res.send('<h1>Successfully Connected to database...</h1>');
//     // var admin = new Admin({
//     //     name : req.body.name,
//     //     email : req.body.email,
//     //     password : req.body.password,
//     // });

//     // admin.save().then(result=>{
//     //     console.log("\n\n\n\n\n\n\n\n\n\n\n\nSuccessfully Added...\n\n\n\n\n\n");
//     //     res.send('<h1>Successfully Connected to database...</h1><br /><h1>Successfully Account Generated...</h1><form action="/myaccount"><button type="submit">My Profile</button></form>');
//     // }).catch(err=>{
//     //     console.log('\n\n\n'+err+'\n\n\n');
//     // });
// //    //console.log(result);

//     Admin.find({email : req.body.email}, (err, data)=>{
//         if (err) throw err;
//         res.send("<h1>"+data+"</h1>");
//     });
    
  
// };



//Sign Up

exports.adminSignUpController = (req,res,next) => {
    Admin.findOne({email : req.body.email}).then(result=>{
        console.log("\n\n\n"+result);
        if(result){
            res.redirect("/admin") }
        else{

            var admin = new Admin({
                name : "Admin",
                email : "demorahuldhruv@gmail.com",
                password : "demord@1234",
            });
            //console.log("\n\n\n"+req.body);
            admin.save().then(result=>{
                console.log("Admin Successfully Signed Up!");
                res.redirect(url.format({
                    pathname : "/admin/adminHome",
                    query : {
                        username : result.name,
                    }
                }));
            }).catch(err=>{
                console.log('\n\n\n'+err+'\n\n\n');
            });

        }
    }).catch(err => { console.log(err);});
   
};
//module.exports.adminSignUpController = adminSignUpController;



//Sign In

exports.adminSignInController = (req,res,next) => {
    //console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;
    //console.log(email, password);
    Admin.findOne({email : email, password : password}).then(result=>{
       //console.log("\n\n\n"+result);
       
        if(result){
            username = result.name;
            // , { user: result.name});
            res.redirect(url.format({
                pathname : "/admin/adminHome",
                query: {
                    adminid : result.id,
                }
                // query : {
                //     username : username,
                // }
            }))
        }
        else{
            // res.render("adminSignIn", {
            //     error: {
            //         isError: true,
            //         msg: "Wrong email or password",
            //     }
            // })

            res.redirect(url.format({
                pathname: "/admin",
                query: {
                    error: true,
                }
            }
            ))
            //res.render("adminSignIn", { email: email, error : "Wrong email or password!"});
        }
    }).catch(err=>{
        console.log(err);
    });
};



// Admin Home 

exports.adminHomeController = async (req,res,next)=>{
    // req.query.username;
    // var frameData ;
        
        var brands = frameController.brands();
        var colors = frameController.colors();
        var materials = frameController.materials();
        var size = frameController.size();
        var prs = frameController.priceRanges();
        
        Frame.find({}).then(result => {
        // console.log(req.query.adminid);
            res.render("adminHome",{ 
                title: "Frames",
                frameData : result,
                brands: brands,
                colors: colors,
                materials: materials,
                size: size,
                priceRanges: prs,
                filters: false,
                });
        }).catch(err => { console.log(err); }); 

        // res.render("adminHome", {
        //     title: "Frames"
        // })
   
    
}



// Admin Home Content

exports.homeContentController = (req,res,next) => {
    var brands = frameController.brands();
    var colors = frameController.colors();
    var materials = frameController.materials();
    var size = frameController.size();
    var prs = frameController.priceRanges();

    Frame.find({}).then(result => {
        // console.log(req.query.adminid);
            res.render("framesWithFilters",{ 
                // title: "Frames",
                frameData : result,
                brands: brands,
                colors: colors,
                materials: materials,
                size: size,
                priceRanges: prs,
                filters: false,
                });
        }).catch(err => { console.log(err); }); 
}



// Admin Filters

exports.adminFiltersController = (req,res,next)=>{
    
    var sbrand, scolor, smaterial, ssize, spriceL, spriceH;
    if(req.query.brand != ""){
         sbrand = [req.query.brand];
    }else{
        sbrand = frameController.brandsArray;
    }
    if(req.query.color != ""){
        scolor = [req.query.color];
   }else{
    scolor = frameController.colorsArray;
   }
   if(req.query.material != ""){
        smaterial = [req.query.material];
    }else{
        smaterial = frameController.materialsArray;
    }
    if(req.query.size != ""){
        ssize = [req.query.size];
    }else{
        ssize = frameController.sizeArray;
    }
    if(req.query.price == ""){
        spriceL= 0;
        spriceH= Infinity;
    }else if(req.query.price == "200")
    {
        spriceL = 0;
        spriceH = 200;
    }else if(req.query.price == "500")
    {
        spriceL = 0;
        spriceH = 500;
    }else if(req.query.price == "1000")
    {
        spriceL = 0;
        spriceH = 1000;
    }else if(req.query.price == "1000-2000")
    {
        spriceL = 1000;
        spriceH = 2000;
    }else if(req.query.price == "2000-5000")
    {
        spriceL = 2000;
        spriceH = 5000;
    }
    var brands = frameController.brands(req.query.brand);
    var colors = frameController.colors(req.query.color);
    var materials = frameController.materials(req.query.material);
    var sizes = frameController.size(req.query.size);
    var prs = frameController.priceRanges(req.query.price);


    Frame.find({
     brand: { $in: sbrand},
     color: { $in: scolor},
     material: { $in: smaterial},
     size: { $in: ssize},
     price: { $gt : spriceL, $lte : spriceH} 
    }).then(result => {
    // console.log(req.query.adminid);
    // console.log("filters")
        res.render("adminHome",{ 
            adminid: req.query.adminid,
             title: "Frames",
             frameData : result,
             brands: brands,
             colors: colors,
             materials: materials,
             size: sizes,
             priceRanges: prs,
             filters: true,
            });
    }).catch(err => { console.log(err); });     
}



// Profile Page

exports.profileController = (req,res,next) => {
    
    Admin.findOne({}).then(result =>{
        res.render("profile", { title:"Profile", admin : result});
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    })
}


// Log Out

exports.adminLogOutController = (req,res,next) =>{
     res.redirect("/adminsigninpage");
   
};



// Display Shop List

exports.adminShopListController = (req,res,next) =>{
    //var shopData = shops.shopList;

    Shop.find({}).sort({ name: 1, dateJoined: 1}).then(result => {
        res.render("adminShopList", { title : "Shops", shopData : result});
    }).catch(err=> { console.log(err);}); 
    //console.log("\n\n\n"+shopData);
    //res.render("adminShopList", { title : "Shops", shopData : shopData});
};



//Add Shop Page

exports.addShopPageController = async (req,res,next) => {

    res.render('addShopForm', { 
        title: "New Shop",
    });
}



// Order List
var orderId = 1;
exports.orderListController = async (req,res,next) => {
 
// var orders = await Order.aggregate([
//     {
//         $lookup: {
//         from: "customers",
//         localField: "custid",
//         foreignField: "_id",
//         as: "customer"
//         }
//     },
//     {
//         $unwind: "$customer"
//         // customer : { $getField: { $literal : "$customer" }}
//     },
//     {
//         $lookup: {
//         from: "frames",
//         localField: "frameid",
//         foreignField: "_id",
//         as: "frames"
//         }
//     },
//     {
//         $unwind: "$frames"
//     },
//     // {
//     //     $group: {
//     //         "_id": "_id",
//     //         customer : { $first : "$customer" }
//     //     }
//     // }
// ])

    // console.log(orders);;
    res.render("orderList", {
        title: "Orders",
        // orders: orders
    })
}



// Orders iFrame 

exports.ordersFrameController = async (req,res,next) => {

    var orders = await Order.aggregate([
        {
            $lookup: {
            from: "customers",
            localField: "custid",
            foreignField: "_id",
            as: "customer"
            }
        },
        {
            $unwind: "$customer"
            // customer : { $getField: { $literal : "$customer" }}
        },
        {
            $lookup: {
            from: "frames",
            localField: "frameid",
            foreignField: "_id",
            as: "frame"
            }
        },
        {
            $unwind: "$frame"
        },
        // {
        //     $group: {
        //         "_id": "_id",
        //         customer : { $first : "$customer" }
        //     }
        // }
    ]);


    res.render("allOrdersFrame", {
        orders: orders
    })

}



// Shopwise orders iFrame 

exports.shopwiseOrdersFrameController = async (req,res,next) => {
    
    var shops = await Shop.find({});

    res.render("shopwiseOrdersFrame", {
        shops: shops,
    })
}



// Shop Orders

exports.shopOrdersController = async (req,res,next) => {

    
    var shopid = mongoose.Types.ObjectId(req.params.shopid);
    
    var orders = await Order.aggregate([
        {
            $match: {
               shopid: shopid
            }
        },
        {
            $lookup: {
            from: "customers",
            localField: "custid",
            foreignField: "_id",
            as: "customer"
            }
        },
        {
            $unwind: "$customer"
            // customer : { $getField: { $literal : "$customer" }}
        },
        {
            $lookup: {
            from: "frames",
            localField: "frameid",
            foreignField: "_id",
            as: "frame"
            }
        },
        {
            $unwind: "$frame"
        },
        // {
        //     $lookup: {
        //     from: "shops",
        //     localField: "shopid",
        //     foreignField: "_id",
        //     as: "shop"
        //     }
        // },
        // {
        //     $unwind: "$shop"
        // },
        // {
        //     $group: {
        //         "_id": "$shopid",
        //         shopName: { $first: "$shop.name"},
        //     }
        // }
    ]);

    res.render("shopOrdersFrame", {
        title: "Shop Orders",
        orders: orders,
        shopname: req.params.shopname,
    });

}



// Order Details

exports.orderDetailsController = async (req,res,next) => {

    var shop = await Shop.findOne({ _id: req.params.shopid});
    var customer = await Customer.findOne({ _id: req.params.custid});
    var frame = await Frame.findOne({ _id: req.params.frameid});
    var params = await Parameters.findOne({ _id: customer.paramsId});



    res.render("orderDetails", {
        title: "Order Details",
        shop: shop,
        cust: customer,
        frame: frame,
        params: params
    })
}



// Analytics

const analytics = require('./analytics');
const Customer = require('../Models/customer');


exports.analyticsController = async (req,res,next) => {

    // var totalShops = analytics.getTotalShops();
    // var totalFrames = analytics.getTotalFrames();
    // var totalFrameSold = analytics.getTotalFrameSold();

    var totalShops = await Shop.countDocuments() //analytics.getTotalShops();
    var totalFrames =  await Frame.countDocuments() //analytics.getTotalFrames();
    var totalFrameSold =  await Order.countDocuments() //analytics.getTotalFrameSold();

    var frameWiseSells = await Order.aggregate([
        {
            $sort : { frameid: 1}
        },
        {
             $group : { _id: "$frameid", sells: { $sum: 1 }}
        },
    ]);


    var orders = await Order.find({});
    // console.log(orders)
    var frameSells = await Frame.aggregate([
        { "$addFields": { "frameId": { "$toString": "$_id" }}},
        // {
        //     $lookup: {
        //         from: "Order",
        //         localField : "frameId",
        //         foreignField: "frameid".toString(),
        //         // let: { id: "_id"}
        //         // pipeline: [
        //         //     $match: {
        //         //         $expr: {
        //         //             $eq : {

        //         //             }
        //         //         }
        //         //     }
        //         // ],
        //         as : "Sells"
        //     }
        // },
        // { $lookup: {
        //     from: "Order",
        //     let: { "frameid": "$_id" },
        //     pipeline: [
        //       { "$addFields": { "frameid": { "$toObjectId": "$userId" }}},
        //       { "$match": { "$expr": { "$eq": [ "$frameid", "$$frameid" ] } } }
        //     ],
        //     as: "Sells"
        //   }
        // },
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "frameid",
                as: "Sells"
            }
        },
        // {
        //     $unwind: "$Sells"
        // },
        {
            $addFields: { 
                "soldTimes": {
                    $size : "$Sells"
                },
            }
        },
        {
            $addFields: {
                "sold" : {
                    $multiply: [
                        "$price", "$soldTimes"
                    ]
                }
            }
        },
        // {
        //     $sort : {
        //         "soldTimes" : 1,
        //     }
        // },
        {
             $project: {
                 "name": 1,
                 "brand": 1,
                 "Sells": 1,
                "soldTimes": 1,
                "sold": 1,
            }
        }
    ])
    //console.log(frameSells);
    // var frameNames = await Frame.find({ }, { _id: 1, brand: 1, name: 1, price: 1}).sort( { _id: 1});
    // console.log(frameNames);
    
    var totalSales = await Frame.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "_id",
                foreignField: "frameid",
                as: "Sells"
            }
        },
        {
            $addFields: { 
                "soldTimes": {
                    $size : "$Sells"
                },
            }
        },
        {
            $addFields: {
                "sold" : {
                    $multiply: [
                        "$price", "$soldTimes"
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$sold"
                }
            }
        },
        // {
        //     $sort : {
        //         "soldTimes" : 1,
        //     }
        // },
        {
             $project: {
                 "total": 1
            }
        }
    ])
    console.log(totalSales)
    res.render("analytics", {
        title: "Analytics",
        totalShops: totalShops,
        totalFrames: totalFrames,
        totalSells: totalSales[0].total,
    })
}

exports.analyticsRefreshController = async (req,res,next) => {
    // setInterval(
    //     async ()=>{

            var totalShops = await Shop.countDocuments() //analytics.getTotalShops();
            var totalFrames =  await Frame.countDocuments() //analytics.getTotalFrames();
            var totalFrameSold =  await Order.countDocuments() //analytics.getTotalFrameSold();
        
                res.render("analyticsRefresh", {
                    totalShops : totalShops,
                    totalFrames : totalFrames,
                    totalSells : totalFrameSold,
                });
            // }, 10000);
}



// Add Frame

exports.addFrameController = async (req,res,next) => {

    // console.log(__dirname);
    
    // sharp(path.join(__dirname + '/../frameImages/' + req.file.filename)).resize({ width: 300, height: 150 }).toFile(path.join(__dirname + '/../frameImages/' + req.file.filename))
    // .then(function(newFileInfo) {
    //     console.log("Successfully Resized...");
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
    // res.send('<h1>Successfully Connected to database...</h1>');
    var frame = new Frame({
        modelNumber: req.body.modelNumber,
        name: req.body.name,
        brand: req.body.brand,
        frameType: req.body.frameType,
        price: req.body.price,
        shape: req.body.shape,
        color: req.body.color,
        size: req.body.size,
        material: req.body.material,
        shape: req.body.shape,
        weightGroup: req.body.weightGroup,
        width: req.body.width,
        //dimension: req.body.dimension,
        FVphoto: {
            name : req.files[0].originalname,
            data: fs.readFileSync(path.join(__dirname + '/../frameImages/' + req.files[0].filename)),            
            contentType: 'image/png|jpg|jpeg',
        },
        SVphoto: {
            name : req.files[1].originalname,
            data: fs.readFileSync(path.join(__dirname + '/../frameImages/' + req.files[1].filename)),            
            contentType: 'image/png|jpg|jpeg',
        },
        AVphoto: {
            name : req.files[2].originalname,
            data: fs.readFileSync(path.join(__dirname + '/../frameImages/' + req.files[2].filename)),            
            contentType: 'image/png|jpg|jpeg',
        },
        // "image.data": fs.readFileSync(req.body.image),
        // "image.contentType": "image/png", 
        uploadDate : new Date(),
    });
    //console.log(req.file);
    frame.save().then(result=>{
       
            res.redirect( url.format({
                pathname: "/admin/adminHome",
                query : {
                    msg : "Successfully Added...",
                }
            }));


            //res.render("adminHome", { msg: "Successfully Added..."});
        
    }).catch(err=>{
        console.log('\n\n\n'+err+'\n\n\n');
        res.redirect( url.format({
            pathname: "/admin/adminHome/addFrameForm",
            query : {
                msg : err,
            }
        }));
    });
   //console.log(result);
};



//Show Frame Deatils

exports.viewFrameDetails = (req,res,next) =>{
    console.log(req.params);
    Frame.findOne({ _id : req.params.frameid }).then(result=>{
    //Frame.findOne({ _id: frameID}).then(result=>{
        console.log(result);
        // res.write("frame");
        // res.end();
        res.render("FrameDetails", { title : "Frame Details" , frame : result});
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    })
    //}).catch(err=>{ console.log(err);})
}



//Delete Frame

exports.deleteFrame = (req,res,next) => {
    Frame.deleteOne({ _id : req.params.frameid }).then(result => {
        res.redirect("/admin/adminHome");
    }).catch( err => {
        console.log(err);
        //res.render("status_code");
    })
}