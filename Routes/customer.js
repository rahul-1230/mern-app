const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
var app= express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const addCust = require("../Controllers/customer");

router.get("/addcustomer",addCust.addCustController);
module.exports = router;