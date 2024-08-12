const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
   const { name, email, message } = JSON.parse(event.body);

   // Skapa en transportör med Gmail:s SMTP-server
   let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.GMAIL_USER, // Din Gmail-adress från miljövariabel
         pass: process.env.GMAIL_PASS, // Ditt Gmail-lösenord eller app-lösenord från miljövariabel
      },
   });

   let mailOptions = {
      from: email,
      to: "danielayzagal@gmail.com", // Mottagarens e-postadress
      subject: "Nytt meddelande från din webbplats",
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
   };

   try {
      await transporter.sendMail(mailOptions);
      return {
         statusCode: 200,
         body: JSON.stringify({ message: "Meddelandet har skickats." }),
      };
   } catch (error) {
      return {
         statusCode: 500,
         body: JSON.stringify({
            message: "Det gick inte att skicka meddelandet.",
            error: error.toString(),
         }),
      };
   }
};
