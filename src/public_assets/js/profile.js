function validatePhoneNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const readButton = document.getElementById('read-button');
        readButton.addEventListener('click', async function () {
            console.log('click');
        })
    } catch (error) {
        console.log(error);
    }
})