const express = require("express");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();
const path = require("path");

// Instantiate an express app
const app = express();

// Middleware för att servera statiska filer från rotmappen
app.use(express.static(path.join(__dirname, "..")));

// Middleware för att servera filer från "scripts" och "styles" mappar
app.use("/scripts", express.static(path.join(__dirname, "..", "scripts")));
app.use("/styles", express.static(path.join(__dirname, "..", "styles")));

// Route för att leverera HTML
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Konfigurera Nodemailer
const transporter = nodemailer.createTransport({
   host: "smtp-mail.outlook.com",
   port: 587,
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
   },
});

// Verifiera anslutning
transporter.verify((error, success) => {
   if (error) {
      console.log(error);
   } else {
      console.log("Server is ready to take our messages");
   }
});

// Route för att ta emot POST-förfrågningar och skicka e-post
app.post("/send", (req, res) => {
   // Skapa en ny multiparty-form och analysera POST-data
   let form = new multiparty.Form();
   let data = {};
   form.parse(req, (err, fields) => {
      if (err) {
         console.error("Error parsing form data:", err);
         return res.status(500).send("Error parsing form data.");
      }

      Object.keys(fields).forEach((property) => {
         data[property] = fields[property].toString();
      });

      // Konfigurera e-postmeddelandet
      const mail = {
         from: `${data.name} <${process.env.EMAIL}>`,
         to: process.env.EMAIL,
         subject: data.subject,
         text: `${data.name} <${data.email}> \n${data.message}`,
      };

      // Skicka e-post
      transporter.sendMail(mail, (err, info) => {
         if (err) {
            console.log(err);
            res.status(500).send("Something went wrong.");
         } else {
            res.status(200).send("Email successfully sent to recipient!");
         }
      });
   });
});

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}...`);
});
