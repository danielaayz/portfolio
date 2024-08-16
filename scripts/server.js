const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static("portfolio"));
app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/portfolio/index.html");
});

app.post("/", (req, res) => {
   console.log(req.body);

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "danielayzagal@gmail.com",
         pass: process.env.GMAIL_PASS,
      },
   });

   const mailOptions = {
      from: req.body.email,
      to: "danielayzagal@gmail.com",
      subject: `Message from ${req.body.name}: ${req.body.subject}`,
      text: req.body.message,
   };

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log(error);
         res.send("error");
      } else {
         console.log("Email sent: " + info.response);
         res.send("success");
      }
   });
});

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
