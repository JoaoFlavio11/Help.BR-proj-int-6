/* eslint-disable no-undef */
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector("aside");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("condensed");
});
