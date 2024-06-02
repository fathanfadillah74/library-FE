const oprConfigApp = require("../config/config");

const getWishlistAPI = async () => {
    try {
        const response = await fetch(oprConfigApp.API.baseUrl + oprConfigApp.API.getWishlist);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in getWishlistAPI:", error);
        return [];
    }
}

const wishlistData = async () => {
    try {
        const data = await getWishlistAPI();
        return data;
    } catch (error) {
        console.error("Error in wishlistData:", error);
        return [];
    }
}

module.exports = { wishlistData }