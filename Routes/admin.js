const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const adminController = require("../Controllers/admin");
const shopController = require('../Controllers/shop');
const frameController = require('../Controllers/frame');

const Admin = require('../Models/admin');
const Frame = require('../Models/frame');
// set up multer for storing uploaded files
const uploadframe = require('./FileStorage/storeFrames')

var multer = require('multer');
const Shop = require('../Models/shop');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'shopLogos')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var uploadshop = multer({ storage: storage });

// Admin Home Page

router.get("/adminHome", adminController.adminHomeController);



// Admin home iframe

router.get("/homeContent", adminController.homeContentController);



// Admin Home Filters

router.get("/adminHome/filters", adminController.adminFiltersController);



function capitalize(str){
    str = str.toLowerCase();
    str = str[0].toUpperCase() + str.slice(1);
    return str;
}
// Admin Frame Search

router.get("/adminHome/search", (req,res,next) => {

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

    Frame.find( searchQuery ).then(result => {
       // console.log(req.query.adminid);
           res.render("adminHome",{ 
               adminid: req.query.adminid,
                title: "Frames",
                frameData : result,
                brands: brands,
                colors: colors,
                materials: materials,
                size: sizes,
               });
       }).catch(err => { console.log(err); });  
});



// Add-Frame Form Page

router.get("/addFrameForm", (req,res,next)=>{
    // req.query.username;
    // if(){
        var brands = frameController.brands();
        var glassTypes = frameController.glassTypes();
        var frameTypes = frameController.frameTypes();
        var materials = frameController.materials();
        var shapes = frameController.shapes();
        var size = frameController.size();
        var colors = frameController.colors();
        var weightGroups = frameController.weightGroups();

        res.render("addFrameForm", { title: "New frame", 
        brands: brands,
        glassTypes: glassTypes,
        frameTypes: frameTypes,
        materials: materials,
        shapes: shapes,
        size: size,
        colors: colors,
        weightGroups: weightGroups,
    })//, { username : req.query.username})
    // }
    //else{res.render("adminHome", { username : ""});}
});



//Adding a new shop page

router.get("/shopSignUpPage",adminController.addShopPageController);



//Adding a new shop 

router.post('/addShop', uploadshop.single('logo'), shopController.shopSignUpController);

//Edit Shop Page

router.get('/editShopPage/:shopid', shopController.editShopPageController);

// Edit Shop 

router.post('/updateShop', uploadshop.single('logo'), shopController.editShopController);

//Delete Shop

router.get('/deleteShop/:shopid', shopController.deleteShopController);

//Adding frame to DB

router.post("/addFrame", uploadframe.uploadframe.array('images'), adminController.addFrameController);

// Edit frame page

router.get("/:frameid/editPage", (req,res,next) =>{
    Frame.findOne({ _id : req.params.frameid }).then(result=>{

        var brands = frameController.brands(result.brand);
        //var glassTypes = frameController.glassTypes(result.glassType);
        var frameTypes = frameController.frameTypes(result.frameType);
        var materials = frameController.materials(result.material);
        var shapes = frameController.shapes(result.shape);
        var size = frameController.size(result.size);
        var colors = frameController.colors(result.color);
        var weightGroups = frameController.weightGroups(result.weightGroup);

        res.render("editFrameForm", { 
            title: "Edit Frame", 
            frame: result,
            brands: brands,
            frameTypes: frameTypes,
            materials : materials,
            shapes: shapes,
            size: size,
            colors: colors,
            weightGroups: weightGroups,
        });
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    });
})

//adminController.editFrameDetailsPage);


router.post("/updateFrame", uploadframe.uploadframe.array('images'), (req,res,next)=>{
    //console.log(req.body);
    
    Frame.findOneAndUpdate({ _id: req.query.frameid},{
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
        updateDate : new Date(),
    }).then(result =>{
        res.redirect("/admin/adminHome");
    }).catch(err =>{
        console.log(err);
        //res.render("status_code");
    });
    
});


router.get("/:frameid/delete", (req,res,next) => {
    Frame.deleteOne({ _id : req.params.frameid }).then(result=>{
        res.redirect("/admin/adminHome");
    }).catch(err=>{
        console.log(err);
        //res.render("stuas_code");
    });
})

//Show Frame Details

router.get("/viewFrameDetails/:frameid", frameController.frameDetailsController);






//router.get("/myaccount",adminController.myprofile);



// Admin Signing-Up 

// router.post("/signup", adminController.adminSignUpController);



// Admn Sign-In page

router.get("/", (req,res,next)=>{

    if(!req.query.error){
        res.render("adminSignIn", { error: { isError: false}});
    }
    else{
        res.render("adminSignIn", {
                error: {
                    isError: true,
                    msg: "Wrong email or password",
                }
            })
    }
});
// Admin Signing-In 

router.post("/signin",adminController.adminSignInController);



// Admin Shop List Page

router.get("/shopList",adminController.adminShopListController);



// Order List 

router.get("/orderList", adminController.orderListController);



// Admin Order iFrame

router.get("/ordersFrame", adminController.ordersFrameController);



// Admin shopwise Orders iFrame

router.get("/orderList/shopwise", adminController.shopwiseOrdersFrameController);



// Shop Orders

router.get("/:shopid/orders/:shopname", adminController.shopOrdersController);



// Admin Order Data

router.get("/order/:shopid/:custid/:frameid", adminController.orderDetailsController);



// Admin Profile

router.get("/profile", adminController.profileController);



// Admin Profile Password Update
router.post("/profile/updatePassword", (req,res,next)=>{
    Admin.findOneAndUpdate({}, {
        password: req.body.password,
    }).then(result=>{
        res.redirect("/admin/profile");
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    });
});




// Admin Analytics

router.get("/analytics", adminController.analyticsController);

router.get("/analyticsRefresh", adminController.analyticsRefreshController);


// Admin Messages  Page

router.get("/messages", async (req,res,next) => {
    var shops = await Shop.find({}, { id: 1, name: 1, city: 1, logoURL : 1});
    res.render("messages", { title : "Messages", shops: shops});
});



// Admin Logging-Out

router.get("/logout",adminController.adminLogOutController);// adding frame


//router.get("/addframe",adminController.addFrameController);
module.exports = router;