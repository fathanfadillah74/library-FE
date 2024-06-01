const api = 'http://localhost:3000';
let data;


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
}

function isTokenExpired(token) {
    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
        return true;
    }

    const now = Date.now().valueOf() / 1000;
    return decodedToken.exp < now;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

async function getUsername() {
    try {
        const getToken = getCookie('token');
        let userProfile = document.getElementById('user-profile');
        let formEdit = document.getElementById('form-edit');
        if (!getToken || isTokenExpired(getToken)) {
            window.location.href = '/login';
            return;
        }
        userProfile.innerHTML = '';
        formEdit.innerHTML = '';
        const response = await fetch(api + '/get/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken}`
            }
        });

        const result = await response.json();
        if (result.ResultCode === 1) {
            for (let i = 0; i < result.data.length; i++) {
                data = result.data[i];
            }
        }
        userProfile.innerHTML = `
        <span>${data.name.toUpperCase()}</span>
        <img src="images/images.jpg" alt="User Profile">
        `

        formEdit.innerHTML = `
        <form class="row g-3" id="form-edit">
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputName4" placeholder="${data.name}">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="${data.email}">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">password</label>
            <input type="password" class="form-control" id="inputPassword4" placeholder="*******">
        </div>
        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Phone</label>
            <input type="tel" class="form-control" id="inputPhone4"
                oninput="validatePhoneNumber(this)" placeholder="${data.phone}">
        </div>
        <div class="col-12">
            <label for="inputAddress" class="form-label">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="${data.address}">
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-primary" id="profile-edit-btn" disabled>Save Changes</button>
        </div>
    </form>`

        const inputs = document.querySelectorAll('#form-edit input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                document.getElementById('profile-edit-btn').disabled = false;
            });
        });

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        getUsername()
    } catch (error) {
        console.log(error);
    }
    try {
        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', function (event) {
                event.preventDefault();
                deleteCookie('token');
                window.location.href = '/login';
            });
        }
    } catch (error) {
        console.log(error);
    }

    try {

    } catch (error) {
        console.log(error);
    }
    try {
        const form = document.getElementById('form-edit');
        if (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const getToken = getCookie('token');
                const nameInput = document.getElementById('inputName4');
                const emailInput = document.getElementById('inputEmail4');
                const passwordInput = document.getElementById('inputPassword4');
                const phoneInput = document.getElementById('inputPhone4');
                const addressInput = document.getElementById('inputAddress');

                const dataUpdate = {
                    name: nameInput.value || nameInput.placeholder,
                    email: emailInput.value || emailInput.placeholder,
                    phone: phoneInput.value || phoneInput.placeholder,
                    address: addressInput.value || addressInput.placeholder,
                };
                if (passwordInput.value) {
                    dataUpdate.password = passwordInput.value;
                } else {
                    dataUpdate.password = data.password;
                }
                try {
                    const response = await fetch(api + '/update/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken}`
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();
                    if (result.ResultCode === 1) {
                        alert('Profile updated successfully');
                    } else {
                        alert('Failed to update profile');
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
})