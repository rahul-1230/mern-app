const express = require('express');
const url = require('url');
const router = express.Router();


const custController = require('../Controllers/customer');
const shopController = require("../Controllers/shop");

const Shop = require('../Models/shop');
const Frame = require('../Models/frame');
const Customer = require('../Models/customer');
const Order = require('../Models/order');
const shopFrame = require('../Models/shopFrames');
const parameters = require('../Models/parameters');

const fshapes = require('./shapewiseframe/shapewiseframe')
const frameController = require('../Controllers/frame');


var multer = require('multer');
const Parameters = require('../Models/parameters');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'shopFrameImages')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var uploadframe = multer({ storage: storage });

router.get("/signinpage", (req,res,next)=>{
    res.render("shopSignIn");
});

//router.post("/shop/addShop",shopController.shopSignUpController);

//router.get("/shopSignUpPage",shopController.shopSignUpPageController);


router.post("/signin", (req,res,next)=>{
    console.log(req.body)
    Shop.findOne({email : req.body.email, password: req.body.password}).then(result => {
        console.log(result);
        if(result){

           res.redirect(url.format({
                pathname: "/shop/"+result.id+"/home",
                // params:{
                //     shopid: result.id,
                // },
                // query: {
                //     id: result.id,
                // } 
            }));
        //    res.render("shopHome", {
        //     title: "My Shop",
        //     shop: result,
        // });
        }
        else{
            res.send("<h1>Wrong Email or Password</h1>")
        }
    }).catch(err=>{console.log(err); })
})

router.get("/:shopid/home", async (req,res,next)=>{
    var frames = await Frame.find({});

    var brands = frameController.brands();
    var colors = frameController.colors();
    var materials = frameController.materials();
    var size = frameController.size();

    //console.log("frames received");
    Shop.findOne({ _id: req.params.shopid }).then(result=>{
        console.log('Shop on Home Page');
       
       
        res.render("shopHome", {
            title: "My Shop",
            shop: result,
            shopid: result.id,
            shopname: result.name,
            frameData: frames,
            brands: brands,
            colors: colors,
            materials: materials,
            size: size,
            err: { isError : false }, 
        });
    
    }).catch(err=>{
        res.render("shopHome", {
            err : { isError : true, msg : "Something went wrong! <br>"+ "Try after sometime."},
        })
        //res.render("error")
    })
});

router.get("/:shopid/:custid/recommend", async (req,res,next)=>{
    var shape = req.query.shape;
    
    var frameShapes = fshapes.suitable(shape);
    try{
        if(shape){
        var frames = await Frame.find({ shape : { $in: frameShapes }});
        }
        else{
            var frames = await Frame.find({});
        }
    }catch(err){
        console.log(err)
        res.status(503).send("Database Fetch Error");
    }
    
    var brands = frameController.brands();
    var colors = frameController.colors();
    var materials = frameController.materials();
    var size = frameController.size();

    Shop.findOne({ _id: req.params.shopid }).then(result=>{
       
        res.render("recommendedFrames", {
            title: "My Shop",
            shop: result,
            shopid: result.id,
            custid: req.params.custid,
            shopname: result.name,
            frameData: frames,
            brands: brands,
            colors: colors,
            materials: materials,
            size: size,
            err: { isError : false }, 
        });
    
    }).catch(err=>{
        res.redirect("/shop/"+req.params.shopid+"/addParams/"+req.query.custid)
        //res.render("error")
    })
});

function capitalize(str){
    str = str.toLowerCase();
    str = str[0].toUpperCase() + str.slice(1);
    return str;
}

router.get("/:shopid/:custid/selectFrame/:frameid", async (req,res,next)=>{
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);
    try{
    var cust = await Customer.findOne({ _id: req.params.custid });
    console.log(cust);
    var parameters = await Parameters.findOne({ _id : cust.paramsId });

        var frame = await Frame.findOne({ _id: req.params.frameid });

        res.render("orderDetails", {
            title: "Order",
            shopid: req.params.shopid,
            cust: cust,
            parameters: parameters,
            frame: frame
        });
    }catch(err){
        console.log(err);
    }

})
router.get("/:shopid/:custid/orderData", async (req,res,next) => {
    try{
        console.log(req.params.shopid, req.params.custid)
    var order = await Order.findOne({ shopid: req.params.shopid, custid: req.params.custid});
    var cust = await Customer.findOne({ _id: req.params.custid});
    console.log(order)
    var parameters = await Parameters.findOne({ id: cust.paramsId});
    var frame = await Frame.findOne({ _id: order.frameid});
    console.log(frame.name);
    res.render("orderData", {
        title: "Order Details",
        shopid: req.params.shopid,
        cust: cust,
        parameters: parameters,
        frame: frame,
    });
    }catch(err){
        console.log(err);
    }
});

var orderId = 1;
router.post("/:shopid/:custid/order/:frameid", shopController.orderController);


router.get("/:shopid/home/search", async (req,res,next) => {

    var search = req.query.search;
    // search = search.toLowerCase()
    // search = search[0].toUpperCase() + search.slice(1)

    search = capitalize(search);

    var brands = frameController.brands();
    var colors = frameController.colors();
    var materials = frameController.materials();
    var sizes = frameController.size();

    var searchQuery = {
        $or : [{brand: search }, {color: search}]
       };
       var frames = await Frame.find( searchQuery );

       Shop.findOne({ _id: req.params.shopid }).then(result=>{
        console.log('Shop on Home Page');
       
       
        res.render("shopHome", {
            title: "My Shop",
            shop: result,
            shopid: result.id,
            shopname: result.name,
            frameData: frames,
            brands: brands,
            colors: colors,
            materials: materials,
            size: sizes,
            err: { isError : false }, 
        });
    
    }).catch(err=>{
        res.render("shopHome", {
            err : { isError : true, msg : "Something went wrong! <br>"+ "Try after sometime."},
        })
        //res.render("error")
    })
});

router.get("/:shopid/home/filters", async (req,res,next)=>{
    var brands = frameController.brands();
    var colors = frameController.colors();
    var materials = frameController.materials();
    var size = frameController.size();

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
    var size = frameController.size(req.query.size);

    var frames = await Frame.find({
        brand: { $in: sbrand},
        color: { $in: scolor},
        material: { $in: smaterial},
        size: { $in: ssize},
        price: { $gt : spriceL, $lte : spriceH} 
    });

    

    //console.log("frames received");
    Shop.findOne({ _id: req.params.shopid }).then(result=>{
        console.log('Shop on Home Page');
   
       
        res.render("shopHome", {
            title: "My Shop",
            shop: result,
            shopid: result.id,
            shopname: result.name,
            frameData: frames,
            brands: brands,
            colors: colors,
            materials: materials,
            size: size, 
        });
    
    }).catch(err=>{
        //res.render("error")
    })
})

router.get("/:shopid/addCustPage", shopController.addCustPageController);

router.get("/:shopid/viewCusts", shopController.viewCustsController);

router.post("/:shopid/addCust", custController.addCustController);

router.get("/:shopid/editCustPage/:custid", custController.editCustPageController);

router.post("/:shopid/updateCust/:custid", custController.updateCustController);

router.get("/:shopid/addParams/:custid", custController.addParamsController);

router.post("/:shopid/parameters/:custid", async (req,res,next) => {
    var params = new parameters({
        pd: req.body.pd,
        ph: req.body.ph,
        tw: req.body.tw,
        et: req.body.et,
        bd: req.body.bd,
        vd: req.body.vd,
        pa: req.body.pa,
        fwa: req.body.fwa,
        res: req.body.res,
        rec: req.body.rec,
        rea: req.body.rea,
        les: req.body.les,
        lec: req.body.lec,
        lea: req.body.lea,
    });
    try{
    var result = await params.save();
    // console.log(result);
    Customer.findOneAndUpdate( { _id: req.params.custid}, {
        paramsId : result.id
    }).then( result => {
        res.redirect("/shop/"+req.params.shopid+"/"+req.params.custid+"/recommend");
    }).catch(err => {
        console.log(err);
    })
    }catch(err){
        console.log(err);
    }
});

router.get("/:shopid/deleteCust/:custid", custController.deleteCustController);
router.get("/", (req,res,next)=> {
    //res.render("shopSignIn");
    res.redirect('/shop/signinpage')

})
router.get("/profile/:shopid", shopController.shopAccountController);

router.post("/:shopid/profile/updatePassword", (req,res,next)=>{
    Shop.findOneAndUpdate({ _id: req.params.shopid}, {
        password: req.body.password,
    }).then(result=>{
        res.redirect("/shop/profile/"+result.id);
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    });
});

router.get("/:shopid/addMyFrameForm", shopController.addFramePageController);

router.get("/:shopid/viewFrame/:frameid", shopController.viewFrameDetailsController);

router.post("/:shopid/addFrame", uploadframe.single('image'),shopController.addFrameController);

// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

router.get("/:shopid/analytics", shopController.analyticsController);

router.get("/:shopid/contactAdmin", (req,res,next) => {

    res.render("shopChat", {
        title: "Contact Admin",
        shopid: req.params.shopid,
    })
})
//router.post("/shopSignUpSubmit",shopController.shopSignUpController);
module.exports = router;