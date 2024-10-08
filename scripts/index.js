let lastScrollY = window.scrollY;

document.addEventListener("scroll", function () {
   const header = document.getElementById("header");
   const currentScrollY = window.scrollY;

   if (currentScrollY > lastScrollY && currentScrollY > 200) {
      // scrolling down and past 200px
      header.classList.add("hidden");
   } else {
      // scrolling up or above 200px
      header.classList.remove("hidden");
   }

   lastScrollY = currentScrollY;
});
