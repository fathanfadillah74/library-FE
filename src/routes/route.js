const { getBooks } = require('../API/getBooks.API');

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
};

module.exports = { route };
