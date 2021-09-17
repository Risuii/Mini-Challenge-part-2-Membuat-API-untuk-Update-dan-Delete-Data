const express = require('express');
const app = express();
const { Mini,User } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// mini Challenge part 1

app.get('/users', (req, res) => {
    Mini.findAll().then(minis => {
        res.status(200).json(minis);
    });
})

app.post('/users', (req, res) => {
    Mini.create({
        username: req.body.username,
        password: req.body.password,
        approved: req.body.approved
    })
        .then(article => {
            res.status(201).json("sukses")
        }).catch(err => {
            res.status(422).json("Fail");
        });
});

// mini Challenge part 2

// create data

app.get('/database/create', (req, res) => {
    res.render('create')
})

app.post('/database/create', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then(article => {
        res.render('create2')
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

// database

app.get('/database', (req, res) => {
    User.findAll()
    .then(article => {
        res.render('database', { article })
    })
})

app.get('/database/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id }})
    .then((article2) => {
        res.render('database2', { article2 })
    })
})

// Update data

app.get('/database/update/:id', (req, res) => {
    User.findOne({ where: { id: req.params.id }})
    .then((article3) => {
        res.render('update', { article3 })
    })
})

app.post('/database/update/:id', (req, res) => {
    User.update({
        username: req.body.username,
        password: req.body.password
    },
    { where: { id: req.params.id }}
    ).then(() => {
        res.render('update2')
    })
})

// Delete Data

app.get('/database/delete/:id', (req, res) => {
    User.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.render('delete')
    })
})

app.listen(3000);