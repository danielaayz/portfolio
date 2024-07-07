"use strict";

document.addEventListener("DOMContentLoaded", function () {
   // Select all elements with the class "showMore"
   const showMoreLinks = document.querySelectorAll(".showMore");

   showMoreLinks.forEach((link) => {
      link.addEventListener("click", function () {
         const cardText = this.closest(".card__text");
         const moreText = cardText.querySelector(".card__more-text");
         const dots = cardText.querySelector(".dots");

         // Toggle the display of the "card__more-text" and "dots" elements
         if (moreText.style.display === "none") {
            moreText.style.display = "inline";
            dots.style.display = "none";
            this.textContent = "Show less";
         } else {
            moreText.style.display = "none";
            dots.style.display = "inline";
            this.textContent = "Show more";
         }
      });
   });
});
