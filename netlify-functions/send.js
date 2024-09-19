const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
   if (event.httpMethod !== "POST") {
      return {
         statusCode: 405,
         body: "Method Not Allowed",
      };
   }

   // Parsar formdata från inkommande POST-förfrågan
   const formData = new URLSearchParams(event.body);

   const name = formData.get("name"); // Hämta fältvärden från formuläret
   const email = formData.get("email");
   const subject = formData.get("subject");
   const message = formData.get("message");

   console.log("Received data:", { name, email, subject, message }); // Loggar inkommande data

   // // Kontrollera om något fält saknas
   // if (!name || !email || !subject || !message) {
   //    return {
   //       statusCode: 400,
   //       body: "All fields are required.",
   //    };
   // }

   // Konfigurera Nodemailer
   const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
         user: process.env.EMAIL, // Miljövariabel för e-post
         pass: process.env.PASS, // Miljövariabel för applösenord
      },
   });

   const mail = {
      from: `${name} <${process.env.EMAIL}>`, // Avsändare (namn + e-postadress)
      to: process.env.EMAIL, // Mottagare (din e-postadress)
      subject: subject, // Ämnesrad
      text: `${name} <${email}> \n${message}`, // Meddelandets innehåll
   };

   try {
      // Kontrollera om något fält saknas
      if (!name || !email || !subject || !message) {
         return {
            statusCode: 400,
            body: "All fields are required.",
         };
      }
      // Skicka e-post
      await transporter.sendMail(mail);
      return {
         statusCode: 200,
         body: "Your message has been successfully sent!",
      };
   } catch (error) {
      console.error("Error sending email:", error); // Logga felet för felsökning
      return {
         statusCode: 500,
         body: "Failed to send email.",
      };
   }
};
