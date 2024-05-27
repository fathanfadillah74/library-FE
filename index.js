const express = require('express');
const path = require('path');
const oprconfig = require('./src/config/config');
const { route } = require('./src/routes/route');
const eta = require("eta");

const app = express();

// Set Eta as view engine
app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set("views", path.join(__dirname, "src/public"));

// Static files
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.static(path.join(__dirname, 'src/public_assets')));

// Routes
route(app);

app.listen(oprconfig.port, () => {
    console.log(`Example app listening on port ${oprconfig.port}`);
});
