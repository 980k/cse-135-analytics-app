window.onload = function() {
    const auth_token = sessionStorage.getItem('auth_token');
    if(auth_token != null){
        console.log('Auth token present');
        redirectBasedOnAdminStatus(auth_token);
    } else {
        window.location.href = "./denied.html"
    }
};

async function redirectBasedOnAdminStatus(token) {
    const decoded = jwt_decode(token);
    const userId = decoded.user.id;
    
    const userResponse = await fetch(`https://reporting.cse135kehu.site/api/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (userResponse.status === 200) {
        const userData = await userResponse.json();
        const isAdmin = userData.isAdmin;

        if (!isAdmin) {
            window.location.href = "./denied.html";
        }
    } else {
        console.log('Error retrieving user data');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".navbar a[href='logout.html']");
  
    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();
  
        sessionStorage.clear();
  
        window.location.href = "logout.html";
    });
  });
