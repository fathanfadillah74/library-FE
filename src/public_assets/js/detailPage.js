const api = 'http://localhost:3000';

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
        if (!getToken || isTokenExpired(getToken)) {
            window.location.href = '/login';
            return;
        }
        userProfile.innerHTML = ''
        const response = await fetch(api + '/get/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken}`
            }
        });

        const result = await response.json();
        let data;
        if (result.ResultCode === 1) {
            for (let i = 0; i < result.data.length; i++) {
                data = result.data[i];
            }
        }
        userProfile.innerHTML = `
        <span>${data.name.toUpperCase()}</span>
        <img src="/images/avatar.png" alt="User Profile">
        `
    } catch (error) {
        console.log(error);
    }
}

async function addWishlist() {
    try {
        const getToken = getCookie('token');
        if (!getToken || isTokenExpired(getToken)) {
            window.location.href = '/login';
            return;
        }
        const response = await fetch(api + '/create/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken}`
            },
            body: JSON.stringify({
                book_id: document.getElementById('book-image').getAttribute('data-id')

            })
        });
        const result = await response.json();
        if (result.ResultCode === 1) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        getUsername();
    } catch (error) {
        console.log(error);
    }
    try {
        const btnAdd = document.getElementById('add-wishlist-btn');
        btnAdd.addEventListener('click', addWishlist);
    } catch (error) {
        console.log(error);
    }
})