var menuButton = document.getElementById("menuButton");
var mobileMenu = document.getElementById("mobileMenu");
var chatButton = document.getElementById("chatButton");
var chatMessage = document.getElementById("chatMessage");

menuButton.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");
});

chatButton.addEventListener("click", function () {
  chatMessage.classList.toggle("hidden");
});
