const loginForm = document.getElementById("login");

window.onload = function() {
    const auth_token = sessionStorage.getItem('auth_token');
    if(auth_token != null){
        console.log('Auth token present');
        redirectBasedOnAdminStatus(auth_token);
    }
};

loginForm.onsubmit = async (e) => {
    e.preventDefault();

    var usernameEmail = document.getElementById("usernameEmail").value;
    var password = document.getElementById("password").value;
    var error = document.getElementById("error-text");

    var isEmail = false;
    var isUsername = false;

    if (usernameEmail.includes("@")) {
        isEmail = true;
    } else {
        isUsername = true;
    }

    requestBody = {
        isEmail,
        isUsername,
        usernameEmail,
        password
    };

    const res = await fetch("https://reporting.cse135kehu.site/api/user/login",{
        method: 'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(response => {
        response.json().then(data => {
            if(response.status != 200){
                error.innerHTML = data.msg;
            } else {
                sessionStorage.setItem('auth_token', data.token);
                redirectBasedOnAdminStatus(data.token);
            }
        });
    }).catch(error =>{
        console.log(error);
    });
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

        if (isAdmin) {
            window.location.href = "./index_admin.html";
        } else {
            window.location.href = "./index.html";
        }
    } else {
        console.log('Error retrieving user data');
    }
}

