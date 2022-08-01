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
// for redirect 
const url = require('url');

exports.getAllFrames = async ()=>{
    // Frame.find().then(result => {
    //     console.log("GetAllFrames...");
    //     // console.log(result);
    //     return result;
    // }).catch(err=>{
    //     console.log(err);
    //     //return "503";

    // })
    try{
    var result = await Frame.find();
    console.log('Frames are fetched...');
    return result;
    }
    catch(err){
        console.log(err);
        return "status_code";
    }
}
exports.viewFrame = (frameid)=>{
    Frame.find({ _id: frameid}).then(result=>{
        return result;
    }).catch(err=>{
        console.log(err);
        // return "503";
        
    })
}
exports.deleteFrame = (frameid)=>{
    Frame.deleteOne({ _id: frameid}).then(result => {
        return true;
    }).catch( err => {
        console.log(err);
        return false;
    })
}
exports.frames = (brand, color, size, price)=>{
    Frame.find({
        brand: req.query.brand,
        color: req.query.color,
        size: req.query.size,
    }).then(result=>{
        res.render("adminHome",{ 
            adminid: req.query.adminid,
             title: "Frames",
             frameData : result,
             brands: brands,
             colors: colors,
             materials: materials,
             size: size,
            });
    }).catch(err=>{
        console.log(err);
        //console.log("status_code");
    })
}
exports.frameDetailsController = (req,res,next)=>{
    Frame.findOne({_id: req.params.frameid}).then(result=>{
        res.render("frameDetails", {title: "Frame "+ result.modelNumber, frame: result});
    }).catch(err=>{
        console.log(err);
        //res.render("status_code");
    })
}

exports.brands = (selectedBrand)=>{
    
    //Define all brands
    var brands = [ 
        { name: "Titan"},
        { name: "Coolwinks"},
        { name: "Rayban"},
        { name: "Wincet Chase"},
        { name: "John Jacobs"},
        { name: "Carrera"},
        { name: "Oakley"},
        { name: "Vogue"},
        { name: "Polaroid"},
        { name: "Fossil"},
        { name: "Prada"},
        { name: "Fastrack"},
        { name: "Eyedo"},
        { name: "Lee Cooper"},
        { name: "Calvin Klein"},
        { name: "IDEE"},
        { name: "Delite Optical"},
        { name: "Salvador"},
        { name: "Valerie Spencer"},
        { name: "Boss Orange"},
        { name: "Lenskart Air"},
        { name: "New Balance"},
    ];

    // Selecting old brand value
    brands.forEach(brand => {
        if(brand.name == selectedBrand){
            brand.selected = true;
        }
    });
       
    return brands;
       
}
exports.brandsArray = [
    "Titan",
         "Coolwinks",
         "Rayban",
         "Wincet Chase",
         "John Jacobs",
         "Carrera",
         "Oakley",
         "Vogue",
         "Polaroid",
         "Fossil",
         "Prada",
         "Fastrack",
         "Eyedo",
         "Lee Cooper",
         "Calvin Klein",
         "IDEE",
         "Delite Optical",
         "Salvador",
         "Valerie Spencer",
         "Boss Orange",
         "Lenskart Air",
         "New Balance",
]

exports.glassTypes = (selectedGlassType)=>{

    //Define All glass types
    var glassTypes = [
        { type: "Presciption Glass"},
        { type: "Sunglass"},
        { type: "Reading Glass"},
        { type: "Digital Protection"},
        { type: "Fake Glass"},
    ];
    //Selecting olf glass type
    glassTypes.forEach(glassType=>{
        if(glassType.type == selectedGlassType){
            glassType.selected = true;
        }
    });
       
    return glassTypes;

}
exports.glassTypesArray = [
    "Presciption Glass",
    "Sunglass",
    "Reading Glass",
    "Digital Protection",
    "Fake Glass"
]

exports.frameTypes = (selectedFrameType)=>{

    //Define All glass types
    var frameTypes = [
        { type: "Rimless"},
        { type: "Semi Rimless"},
        { type: "Full Rimmed"},
    ];
    //Selecting olf glass type
    frameTypes.forEach(frameType=>{
        if(frameType.type == selectedFrameType){
            frameType.selected = true;
        }
    });
      
    return frameTypes;      
}
exports.frameTypesArray = [
    "Rimless",
    "Semi Rimless",
    "Full Rimmed"
]

exports.colors = (selectedColor)=>{

    var colors = [
        { name: "Black", value: "#000000"},
        { name: "Brown", value: "#a52a2a"},
        { name: "Blue", value: "#0000ff"},
        { name: "Grey", value: "#808080"},
        { name: "Gold", value: "#ffd700"},
        { name: "Red", value: "#ff0000"},
        { name: "Orange", value: "#ffa500"},
        { name: "Silver", value: "#c0c0c0"},
        { name: "Tortoise", value: "#7d5446 "},
        { name: "Gunmetal Gray", value: "#8D918D"},
        { name: "Green", value: "#008000"},
        { name: "Purple", value: "#800080"},
        { name: "Pink", value: "#ffc0cb"},
        { name: "White", value: "#ffffff"},
        { name: "Maroon", value: "#800000"},
        { name: "Rose Gold", value: "#B76E79"},
        { name: "Transparent", value: ""},
    ];
    if(selectedColor){
        colors.forEach(color=>{
            if(color.name == selectedColor){
                color.selected = true;
            }
        });
    }
 
    return colors;  
}
exports.colorsArray = [
    "Black", "Brown", "Blue", "Grey", "Gold", "Red", "Orange", "Silver", "Tortoise", "Gunmetal Gray", "Green", "Purple",
    "Pink", " White", "Maroon", "Rose Gold", "Transparent"
]

exports.shapes = (selectedShape)=>{

    var shapes = [
        { name: "Rectangle"},
        { name: "Round"},
        { name: "Cat Eye"},
        { name: "Square"},
        { name: "Aviator"},
        { name: "Wayfarcer"},
        { name: "Geometric"},
        { name: "Hexagonal"},
        { name: "Clubmaster"},
        { name: "Oval"},
    ];

    if(selectedShape){
    shapes.forEach( shape => {
        if(shape.name == selectedShape){
            shape.selected = true;
        }
    });
    }

    return shapes;      
}
exports.shapesArray = [
    "Reactangle",
    "Round",
    "Cat Eye",
    "Square",
    "Aviator",
    "Wayfarcer",
    "Geometric",
    "Hexagonal",
    "Clubmaster",
    "Oval",
]

exports.size = (selectedSize) => {

    var size = [
        { name: "Extra Narrow"},
        { name: "Narrow"},
        { name: "Medium"},
        { name: "Wide"},
        { name: "Extra Wide"},
    ];
    size.forEach( size => {
        if(size.name == selectedSize){
            size.selected = true;
        }
    });
       
    return size;  
}
exports.sizeArray = [
    "Extra Narrow",
    "Narrow",
    "Medium",
    "Wide",
    "Extra Wide",
]

exports.materials = (selectedMaterial)=>{

    var materials = [
        { material: "Plastic"},
        { material: "Metal"},
    ];

    materials.forEach( material =>{
        if(material.material == selectedMaterial){
            material.selected = true;
        }
    });
     
    return materials; 
}
exports.materialsArray = [
    "Plastic", "Metal"
]

exports.weightGroups = (selectedWeightGroup)=>{

    var weightGroups = [
        { group: "Light"},
        { group: "Average"}
    ];
    if(selectedWeightGroup){
        weightGroups.forEach( group => {
            if(group.group == selectedWeightGroup){
                group.selected = true;
            }
        })
    }
       
    return weightGroups; 
}
exports.weightGroupsArray = [
    "Light", "Average"
]

exports.priceRanges = (selectedPriceRange) => {
    var pr = [
        { range: "Upto 200"},
        { range: "Upto 500"},
        { range: "Upto 1000"},
        { range: "1000-2000"},
        { range: "2000-5000"},
    ];

    if(selectedPriceRange){
        pr.forEach( pr => {
            if(pr.range == selectedPriceRange){
                pr.selected = true;
            }
        })
    }

    return pr;
}