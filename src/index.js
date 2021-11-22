const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
const routes = require('./config/routes')
const env = require('./config/env/index')

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(routes);

console.log(env.mongoUrl);
mongoose.connect(env.mongoUrl, { useNewUrlParser: true })
    .then(listen)
    .catch(err => console.error(err));

function listen() {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`)
    });
};