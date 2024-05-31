const oprConfigApp = require('../config/config');


const getDataUser = async () => {
    const response = await fetch(oprConfigApp.API.baseUrl + oprConfigApp.API.getUser);
    const data = await response.json();
    return data;
}

const getUser = async () => {
    try {
        const data = await getDataUser();
        return data;
    } catch (error) {
        console.error("Error in getUser:", error);
        return [];
    }
}

module.exports = { getUser }