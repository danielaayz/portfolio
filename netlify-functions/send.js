const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   host: "smtp-mail.outlook.com",
   port: 587,
   auth: {
      user: process.env.EMAIL, // Miljövariabel för e-post
      pass: process.env.PASS, // Miljövariabel för applösenord
   },
});

exports.handler = async (event, context) => {
   if (event.httpMethod !== "POST") {
      return {
         statusCode: 405,
         body: "Method Not Allowed",
      };
   }

   const formData = new URLSearchParams(event.body); // Parsar formdata

   const name = formData.get("name");
   const email = formData.get("email");
   const subject = formData.get("subject");
   const message = formData.get("message");

   const mail = {
      from: `${name} <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: subject,
      text: `${name} <${email}> \n${message}`,
   };

   try {
      // Send e-mail
      await transporter.sendMail(mail);
      return {
         statusCode: 200,
         body: "Email successfully sent to recipient!",
      };
   } catch (error) {
      return {
         statusCode: 500,
         body: "Failed to send email.",
      };
   }
};
