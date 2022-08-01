const mailer = require('nodemailer');
const Admin = require('../Models/admin');

var getAdminInfo = async () => {
    var info = await Admin.findOne({ });
    //console.log(info);
    return info;
}
var adminInfo = getAdminInfo();

exports.transporter = mailer.createTransport({
    // service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: adminInfo.email,
      pass: adminInfo.password
    }
});

exports.mail = adminInfo.email;

