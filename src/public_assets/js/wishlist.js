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
        <img src="images/images.jpg" alt="User Profile">
        `
    } catch (error) {
        console.log(error);
    }
}

async function loadWishlist() {
    try {
        const response = await fetch(api + '/get/wishlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            }
        });

        const result = await response.json();
        if (result.ResultCode === 1) {
            const wishlistTable = document.getElementById('wishlist-table');
            wishlistTable.innerHTML = '';
            result.data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td><img src='${item.thumbnail}'></td>
                    <td>${item.title}</td>
                    <td>${item.authors.split('{').join('').split('}').join('').split('"').join('')}</td>
                    <td>${new Date(item.date_added).toLocaleDateString()}</td>
                    <td><button type="button" class="btn btn-danger" data-id='${item.wishlist_id}'>Delete</button></td>
                    <td><button type="button" class="btn btn-success" id="read-button" onclick="window.open('${item.preview_link}', '_blank')">Read</button></td>
                `;
                wishlistTable.appendChild(row);
            });
            const deleteButtons = document.querySelectorAll('.btn-danger');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function() {
                    deleteWishlist(this.getAttribute('data-id'));
                });
            });
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error loading wishlist:", error);
    }
}

async function deleteWishlist(wishlistId) {
    try {
        const response = await fetch(api + '/delete/wishlist', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({ wishlist_id: wishlistId })
        });
        const result = await response.json();
        if (result.ResultCode === 1) {
            alert('Wishlist deleted successfully!');
            loadWishlist();
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error deleting wishlist:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {
        loadWishlist();
    } catch (error) {
        console.log(error);
    }
    try {
        getUsername();
    } catch (error) {
        console.error(error);
    }
})