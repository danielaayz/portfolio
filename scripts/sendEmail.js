const form = document.getElementById("contact-form");
const modal = document.getElementById("messageModal");
const modalMessage = document.getElementById("modalMessage");
const closeBtn = document.querySelector(".close");

form.addEventListener("submit", (event) => {
   event.preventDefault();

   let mail = new FormData(form);

   fetch("/send", {
      method: "POST",
      body: mail,
   })
      .then((response) => response.text())
      .then((result) => {
         console.log(result);
         showModal(result); // Alert the response from the server
      })
      .catch((error) => {
         console.error("Error:", error);
         showModal("Failed to send email");
      });
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
