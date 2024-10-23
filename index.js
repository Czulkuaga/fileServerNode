require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path');
const fileupload = require("express-fileupload");
const morgan = require('morgan')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
// const subscriptionScheduler = require('./taskmanager/subscriptionScheduler');

const ApiRoute = require('./routes/api');

//Database Conection
const connection = mongoose.connect(process.env.MONGO_CONNECTION_SERVER)
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));

// Global middlewares
// Middleware para servir archivos estáticos

app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '2gb' }));
app.use(fileupload({
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
}));
app.use(bodyParser.json({ limit: '2gb' }));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000000,
    limit: '2gb',
    extended: true
}));

//Static Files
// Middleware to serve static files
app.use('/files', express.static(path.join(__dirname, 'public/files')));


//Routes
app.use(ApiRoute)
app.use((req, res) => {
    res.status(404).json({ MessageError: 'La ruta a la que intenta acceder no existe.' })
})

app.listen(PORT, console.log(`server on port ${PORT}`))