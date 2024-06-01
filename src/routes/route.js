const { getBooks, getBookById } = require('../API/getBooks.API');
const { getUser } = require('../API/getUser.API');

const route = (app) => {
    app.get('/', async (req, res) => {
        try {
            const data = await getBooks();
            res.render('index', { data: data });
        } catch (error) {
            console.error('Error in route handler:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    app.get('/login', async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            console.error('Error in route handler:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    
    app.get('/detail-page/:id', async (req, res) => {
        try {
            const bookId = req.params.id;
            const book = await getBookById(bookId);
            if (!book) {
                return res.status(404).send('Buku tidak ditemukan');
            }
            res.render('detailPage', { data: book });
        } catch (error) {
            console.error('Error in route handler:', error);
            res.status(500).send('Kesalahan Server Internal');
        }
    });    

    app.get('/profile', async (req, res) => {
        try {
            res.render('profile');
        } catch (error) {
            console.error('Error in route handler:', error);
            res.status(500).send('Internal Server Error');
        }
    });
};

module.exports = { route };
