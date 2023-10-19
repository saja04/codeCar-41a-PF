require("dotenv").config();

const nodemailer = require('nodemailer');

const {NODEMAILER_EMAIL, NODEMAILER_PASSWORD} = process.env

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD,
  },
  });


  // transporter.verify().then(() => {
  //   console.log('Ready for send emails');
  // });

  module.exports = transporter;