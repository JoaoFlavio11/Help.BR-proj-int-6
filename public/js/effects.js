/* eslint-disable no-undef */
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector("aside");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("condensed");
});

//Slider
let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
  nextImage();
}, 5000);

function nextImage() {
  count++;
  if (count > 3) {
    count = 1;
  }
  document.getElementById("radio" + count).checked = true;
}
//Fim do Slider
