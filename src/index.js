const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 4000;
const routes = require('./config/routes')

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb://localhost:27017/instagram', {
    autoIndex: true, //make this also true
})
    .then(listen)
    .catch(err => console.error(err));

function listen() {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    });
};