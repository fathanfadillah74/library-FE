const api = 'http://localhost:3000'

function validatePhoneNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}
document.addEventListener('DOMContentLoaded', async function () {
    try {
        document.getElementById('show-register').addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.login-form').style.display = 'none';
            document.querySelector('.register-form').style.display = 'block';
        });
    } catch (error) {
        console.log(error);
    }

    try {
        document.getElementById('show-login').addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.register-form').style.display = 'none';
            document.querySelector('.login-form').style.display = 'block';
        });
    } catch (error) {
        console.log(error);
    }

    try {
        const btn = document.getElementById('btn-login');
        btn.onclick = async (e) => {
            e.preventDefault()

            const data = {
                email: e.target.form[0].value,
                password: e.target.form[1].value

            }

            const response = await fetch(api + '/login/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result.ResultCode === 1) {
                document.cookie = `token=${result.token}; path=/`;
                alert(result.message);
                window.location.href = '/';
            } else {
                alert(result.message);
                console.log('Login failed:', result.message);
            }
        }
    } catch (error) {
        console.log(error)
    }

    try {
        const btn = document.getElementById('btn-register');
        btn.onclick = async (e) => {
            e.preventDefault()

            const data = {
                name: e.target.form[0].value,
                email: e.target.form[1].value,
                password: e.target.form[2].value,
                phone: e.target.form[3].value
            }

            const response = await fetch(api + '/create/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result.ResultCode === 1) {
                document.querySelector('.register-form').style.display = 'none';
                document.querySelector('.login-form').style.display = 'block';
            } else {
                console.log('Login failed:', result.message);
            }
        }
    } catch (error) {
        console.log(error)
    }

})