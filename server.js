const mongoose = require('mongoose')
const express = require('express')
const shortens = require('./models/shortens')
const app = express()

mongoose.connect('mongodb://localhost/shortens', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
const shortUrls = await shortens.find()
res.render('index', {shortUrls: shortUrls})
})

app.post('/shortens', async (req, res) => {
    await shortens.create({full: req.body.fullUrl})
    res.redirect('/')
})

app.listen(process.env.PORT || 5000);

