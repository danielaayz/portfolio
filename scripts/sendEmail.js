// Hantera formulärinmatning och skicka en POST-begäran till backend för att skicka ett e-postmeddelande.

const form = document.getElementById("contact-form");
const modal = document.getElementById("messageModal");
const modalMessage = document.getElementById("modalMessage");
const closeBtn = document.querySelector(".close");

form.addEventListener("submit", (event) => {
   event.preventDefault();

   let mailData = new URLSearchParams(new FormData(form)).toString();

   //let mail = new FormData(form);

   // for (let pair of mail.entries()) {
   //    console.log(pair[0] + ": " + pair[1]);
   // }

   fetch("/.netlify/functions/send", {
      // Skickar POST-förfrågan till servern
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
      body: mailData, // Skickar formdata (name, email, subject, message)
   })
      .then((response) => {
         if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
         }
         return response.text();
      })
      .then((result) => {
         console.log(result);
         showModal(result);
      })
      .catch((error) => {
         console.error("Error:", error);
         showModal("Failed to send email");
      });
   // .then((response) => response.text()) // Behandlar svaret från servern
   // .then((result) => {
   //    console.log(result);
   //    showModal(result); // Visar modal med serverns svar
   // })
   // .catch((error) => {
   //    console.error("Error:", error);
   //    showModal("Failed to send email");
   // });
});

// Function to show the modal
function showModal(message) {
   modalMessage.textContent = message;
   modal.style.display = "block";
}

// Close the modal when clicking the "x" button
closeBtn.addEventListener("click", () => {
   modal.style.display = "none";
});

// Close the modal when clicking anywhere outside of it
window.addEventListener("click", (event) => {
   if (event.target === modal) {
      modal.style.display = "none";
   }
});
