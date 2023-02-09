const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')


mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0/passport-jwt', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then((db) => console.log("DB is connected"))
    .catch((err) => console.log(err));

const app = express()

require('./auth/auth')

app.use(bodyParser.json())
app.use(routes)

const PORT = 3000

app.listen(PORT, function () {
    console.log(`App listening on ${PORT}`)  
})