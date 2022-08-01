const express = require('express');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const url = require('url');
const mongoose = require('mongoose');
const ejs = require('ejs');


const Shop = require('../Models/shop');
const Cust = require('../Models/customer');
const shopFrame =require('../Models/shopFrames');
const Frame = require('../Models/frame');
const Order = require('../Models/order');
const mailer = require('./mailer');

const { errorMonitor } = require('stream');
const Customer = require('../Models/customer');

var transporter = mailer.transporter;

var fromEmail = mailer.mail;



exports.shopSignUpPageController = (req,res,next) => {
    res.render('shopSignUpPage', { title: "New Shop"});
}

exports.shopSignUpController = (req,res,next) => {
    // 

       // res.send('<h1>Successfully Connected to database...</h1>');
    var shop= new Shop({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        website : req.body.website,
        logoURL : {
                name : req.file.originalname,
                data: fs.readFileSync(path.join(__dirname + '/../shopLogos/' + req.file.filename)),            
                contentType: 'image/png|jpg|jpeg',
        },
        address : req.body.address,
        city: req.body.city,
        ownerName: req.body.ownerName, 
        dateJoined : new Date().toLocaleDateString(),
        timeJoined : new Date().toTimeString(),
        updateDate: new Date(),
    });

    shop.save().then( result => {
        
        var content = fs.readFileSync(__dirname+'/content.ejs').toString();
        var keys = [
            '__username__',
            '__email__',
            '__password__' 
        ]
        var values = [result.name,result.email,result.password ]
       for(var i=0; i<3; i++){
           content  = content.replace(keys[i], values[i]);
       }
        

        var mailOptions = {
            from: fromEmail,
            to: req.body.email,
            subject: 'Shop Registration',
            html: content,
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        res.redirect("/admin/shopList");
    }).catch(err=>{
        //res.json({err : err,message :'\n\n\n Please GO Back...'});
        console.log(err);
        res.write('<h1 style="text-align: center; width: 100%; ">Something went wrong!</h1><br><h3>Try again...</h3>');
        return res.end();
    });
}



//Edit Shop Page

exports.editShopPageController = (req,res,next)=>{
    console.log("Edit Shop Page");
    Shop.findOne({ _id : req.params.shopid }).then(result =>{
        res.render("editShopForm", {
            title: "Edit Shop Details",
            shop: result,
            shopid: result.id,
        })
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    });
}    



//Edit shop

exports.editShopController = (req,res,next)=>{
    console.log("Edit Shop");
    Shop.findOneAndUpdate({ _id: req.query.shopid},{
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
        website : req.body.website,
        logoURL : {
                name : req.file.originalname,
                data: fs.readFileSync(path.join(__dirname + '/../shopLogos/' + req.file.filename)),            
                contentType: 'image/png|jpg|jpeg',
        },
        address : req.body.address,
        city: req.body.city,
        ownerName: req.body.ownerName, 
        updateDate: new Date(),
    }).then(result =>{
        res.redirect("/admin/shopList")
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    })
}



//Delete  Shop 

exports.deleteShopController = (req,res,next)=>{
    Shop.deleteOne({ _id: req.params.shopid }).then(result=>{
        res.redirect("/admin/shoplist")
    }).catch(err=>{
        console.log(err);
    })
}
//Add new Customer

exports.addCustPageController = (req,res,next) =>{
    res.render('addCustPage', { title: "Add Customer", shopid : req.params.shopid });
}

exports.viewCustsController = async (req,res,next)=>{
    var myshop = await Shop.findOne({ _id: req.params.shopid});
    console.log(myshop.name);
    Cust.find({shopid: req.params.shopid}).then(result => {
     res.render('viewCusts', {title: "My Customers", shopid: req.params.shopid, shopname: myshop.name, custs : result})
    }).catch(err=> {
        // console.log("status_code");
    })
}
// exports.addCustController = (req,res,next) =>{
//     var cust = new Cust({
//         name= req.body.name,
//         email= req.body.email,

//     }
//     );
// }


exports.addFramePageController = (req,res,next) =>{
    res.render("addMyFrameForm", { title: "New Frame", shopid: req.params.shopid});
}


exports.addFrameController = async (req,res,next) => {

    // console.log(__dirname);
    // console.log(req);
    sharp(path.join(__dirname + '/../shopFrameImages/' + req.file.filename)).resize({ width: 300, height: 150 }).toFile(path.join(__dirname + '/../shopFrameImages/' + req.file.filename))
    .then(function(newFileInfo) {
        console.log("Frame image resized.");
    })
    .catch(function(err) {
        console.log(err);
    });

    var frame = new shopFrame({
        modelNumber: req.body.modelNumber,
        name: req.body.name,
        brand: req.body.brand,
        frameType: req.body.frameType,
        price: req.body.price,
        shape: req.body.shape,
        color: req.body.color,
        size: req.body.size,
        material: req.body.material,
        glassType: req.body.glassType,
        shape: req.body.shape,
        weightGroup: req.body.weightGroup,
        width: req.body.width,
        //dimension: req.body.dimension,
        photo: {
            name : req.file.originalname,
            data: await fs.readFileSync(path.join(__dirname + '/../shopFrameImages/' + req.file.filename)),            
            contentType: 'image/png|jpg|jpeg',
        },
        // "image.data": fs.readFileSync(req.body.image),
        // "image.contentType": "image/png", 
        uploadDate : new Date(),
        shopid: req.params.shopid,
    });
    //console.log(req.file);
    frame.save().then(result=>{
        
        // fs.unlinkSync(path.join(__dirname + '/../shopFrameImages/' + req.file.filename), err => {
        //     if (err) {console.log(err);}
        //     else{console.log("Temparory File Deleted...");}
        // });
 
            res.redirect( url.format({
                pathname: "/shop/shopHome",
                // query : {
                //     msg : "Successfully Added...",
                // }
            }));


            //res.render("adminHome", { msg: "Successfully Added..."});
        
    }).catch(err=>{
        console.log(err);
        // res.redirect( url.format({
        //     pathname: "/admin/adminHome/addFrameForm",
        //     query : {
        //         msg : err,
        //     }
        // }));
        //res.render("status_code");
    });
   //console.log(result);
};

exports.viewFrameDetailsController = (req,res,next) =>{
    console.log(req.params);
    Frame.findOne({ _id: req.params.frameid }).then(result=>{
           res.render("viewFrame", {
               title: "View Frame",
               shopid: req.params.shopid,
               frame: result, 
           });
       }).catch(err=>{
           console.log(err);
           //res.render("status_code");
       });
}

exports.analyticsController = async(req,res,next) => {

    var shopid = mongoose.Types.ObjectId(req.params.shopid)
    var custs = await Order.aggregate([
        {
            $match: {
                shopid : shopid
            }
        },
    ])

    var totalCusts = custs.length;
    console.log(custs);

    res.render("myAnalytics", {
        title: "My Analytics",
        totalCusts: totalCusts,
        totalFrames: totalCusts,
        shopid: req.params.shopid,
    })
}

exports.shopAccountController = (req,res,next) => {

    Shop.findOne({_id: req.params.shopid}, (err,data)=>{
        if (err) throw err;
        //console.log(data)
        res.render("myProfile", { shop: data});
    });

};

exports.shopList = () => {
    var shopData;
    Shop.find({}).then(result => {
            console.log(result); 
            shopData = result;
        }).catch(err=> { console.log(err);});
    return shopData;
    };

    var orderId = 1;
    exports.orderController = async (req,res,next) => {
    
        var order = new Order({
            // orderid: orderId,
            shopid: req.params.shopid,
            custid: req.params.custid,
            frameid: req.params.frameid,
            empId: req.body.empid,
            date: new Date(),
        });
    
        var custName = req.query.custName; // await Customer.findOne({ _id : req.params.custid});
        var shop = await Shop.findOne({ _id : req.params.shopid}); 
        var frameName = req.query.frameName;
        // var result = await Frame.findOneAndUpdate({ _id: req.params.frameid}, { sells: {}})
        order.save().then( result => {
            
            var content = fs.readFileSync(__dirname+'/orderMail.ejs').toString();
            var keys = [
                '__cust-name__',
                '__frame-name__',
                '__shop-name__' 
            ]
            var values = [custName,frameName,shop.name]
           for(var i=0; i<3; i++){
               content  = content.replace(keys[i], values[i]);
           }
            
    
            var mailOptions = {
                from: fromEmail,
                to: req.body.email,
                subject: 'Frame Purchase',
                html: content,
              };
    
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
    
            
            res.redirect("/shop/"+req.params.shopid+"/viewCusts");
        }).catch(err => {
            console.log(err);
        });
    }
