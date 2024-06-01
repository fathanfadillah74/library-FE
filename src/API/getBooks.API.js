const oprConfigApp = require('../config/config');

const getBooksAPI = async () => {
    const response = await fetch(oprConfigApp.API.baseUrl + oprConfigApp.API.getAllBooks);
    const data = await response.json();
    return data;
}

const getBooks = async () => {
    try {
        let data = []
        const books = await getBooksAPI();
        if (books.ResultCode === 1) {
            data = books.data.map(book => {
                if (book.thumbnail === null) {
                    book.thumbnail = 'images/images.jpg';
                }
                return book;
            });
            return data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error in getBooks:", error);
        return [];
    }
}

async function getBookById(id) {
    try {
        const getbooks = await getBooks();
        const book = getbooks.find(book => book.book_id === id);

        if (book) {
            book.thumbnail = book.thumbnail !== null ? book.thumbnail : 'images/default-thumbnail.jpg';
            book.description = book.description !== null ? book.description : 'No description available';
        }

        return book;
    } catch (error) {
        console.error("Error in getBookById:", error);
        return null;
    }
}

module.exports = { getBooks, getBookById };
