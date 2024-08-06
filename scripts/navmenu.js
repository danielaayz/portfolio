"use strict";

document.addEventListener("DOMContentLoaded", function () {
   const navIconEl = document.getElementById("nav-icon");
   const headerBarEl = document.getElementById("header-bar");
   const navLinkEl = this.documentElement.querySelectorAll(".nav__link");

   navIconEl.addEventListener("click", function (event) {
      event.preventDefault();
      headerBarEl.classList.toggle("open");
   });

   navLinkEl.forEach((link) => {
      link.addEventListener("click", function () {
         headerBarEl.classList.remove("open");
      });
   });
});
