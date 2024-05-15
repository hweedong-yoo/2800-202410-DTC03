require('dotenv').config();
const express = require('express');
var session = require('express-session');
const app = express();


const ejs = require('ejs');

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

app.get('/body_comp', (req, res) => {
    res.render(`body_composition.ejs`, {})
});


app.listen(port, () => {
    console.log(`Server is running on port`, port);
}); 