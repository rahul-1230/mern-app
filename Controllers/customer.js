const express = require('express');


const mongoose = require('mongoose');
const Customer = require('../Models/customer');
const Order = require('../Models/order'); 

exports.addCustController = (req,res,next) => {
    
     var fullname = req.body.fname + " " + req.body.lname;
    
    var customer= new Customer({
        name : fullname,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        profession : req.body.profession,
        gender : req.body.gender,
        birthdate : req.body.birthDate,
        city: req.body.city,
        shopid: req.params.shopid,
    });

    customer.save().then(result=>{        
        res.redirect("/shop/"+req.params.shopid+"/viewCusts")
    }).catch(err=>{
        console.log(err);
    });

}

exports.editCustPageController = (req,res,next)=>{
    
    Customer.findOne({ _id : req.params.custid}).then(result=>{
        var fullname = result.name.split(" ");
        var fname = fullname[0];
        var lname = fullname[1];
        console.log(fullname)
        res.render("editCustForm", {
            title: "Edit Customer Details",
            cust: result,
            fname: fname,
            lname: lname,
            shopid: req.params.shopid,
        });
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    })
}

exports.updateCustController = (req,res,next)=>{
    var fullname = req.body.fname + " " + req.body.lname;

    Customer.findOneAndUpdate({ _id: req.params.custid},{
        name : fullname,
        email : req.body.email,
        phone : req.body.phone,
        address : req.body.address,
        profession : req.body.profession,
        gender : req.body.gender,
        birthdate : req.body.birthDate,
        city: req.body.city,
        //shopid: req.params.shopid,
     }).then(result=>{
         res.redirect("/shop/"+req.params.shopid+"/viewCusts");
     }).catch(err=>{
         console.log(err);
         //res.render("status_code");
     });
}

exports.deleteCustController = (req,res,next)=>{
    Customer.deleteOne({_id: req.params.custid}).then(result=>{
        res.redirect("/shop/"+req.params.shopid+"/viewCusts")
    }).catch(err=>{
        console.log(err);
    })
}

exports.addParamsController = (req,res,next) => {
    res.render('frameEyeParameters', {
        title: "Parameters",
        shopid: req.params.shopid,
        custid: req.params.custid
    });
}