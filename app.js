const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connection = require('./helpers/mongodbConnect');

// port config
const app = express();
const port = process.env.PORT;

// MongoDB connection
connection();

app.use(cors());

// template engine
app.set('view engine', 'ejs');

// views folder
app.set('views', `${__dirname}/views`);

// static folder
app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());


// routes
app.use('/api', require('./routes/routeBackAPI'));

// route: 404
app.use((req, res, next) => {
    res.status(404).render('404', {
        error: '404',
        msg: 'Página no encontrada'
    })
});


app.listen(port, () => console.log(`Servidor a la escucha del puerto: ${port}.`));