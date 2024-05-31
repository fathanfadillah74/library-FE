const api = 'http://localhost:3000'
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function getUsername() {
    try {
        const getToken = getCookie('token');
        let userProfile = document.getElementById('user-profile');
        userProfile.innerHTML = ''
        const response = await fetch(api + '/get/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken}`
            }
        });

        const result = await response.json();
        console.log("🚀 ~ getUsername ~ result:", result)
        let data;
        if (result.ResultCode === 1) {
            for (let i = 0; i < result.length; i++) {
                data = result[i];
            }
        }
        console.log("🚀 ~ getUsername ~ data:", data)

        // userProfile.innerHTML = `
        // <span>${data.name}</span>
        // <img src="images/images.jpg" alt="User Profile">
        // `
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
})