const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
   event.preventDefault();

   let mail = new FormData(form);

   fetch("/send", {
      method: "POST",
      body: mail,
   })
      .then((response) => response.text()) // Use .text() since the server sends a plain text response
      .then((result) => {
         console.log(result);
         alert(result); // Alert the response from the server
      })
      .catch((error) => {
         console.error("Error:", error);
         alert("Failed to send email");
      });
});
