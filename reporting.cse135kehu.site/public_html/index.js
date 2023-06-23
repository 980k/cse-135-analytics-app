window.onload = function () {
  const auth_token = sessionStorage.getItem('auth_token');
  if (!auth_token) {
    console.log('Authentication token not present');
    window.location.href = './login.html';
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.querySelector(".navbar a[href='logout.html']");

  logoutButton.addEventListener("click", function (event) {
      event.preventDefault();

      sessionStorage.clear();

      window.location.href = "logout.html";
  });
});