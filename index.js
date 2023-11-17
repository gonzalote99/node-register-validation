const express = require('express');
const expresApp = express();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

expresApp.set('view engine', 'pug');
expresApp.set('views', 'views');

expresApp.use(bodyParser.urlencoded({extended: false}));

expresApp.get('/', (req, res) => {
  res.render('index')
});

expresApp.get('/sign-in', (req, res) => {
  res.render('sign-in')
});

expresApp.get('/sign-up', (req, res) => {
  res.render('sign-up')
});

expresApp.post('/sign-in', (req, res) => {
  let person = JSON.parse(localStorage.getItem('person'));

  if(person.name === req.body.name & person.password === req.body.password) {
    res.redirect('/');
  } else {
    res.render('error')
  }
});

expresApp.post('/sign-up', (req, res) => {
  if(req.body.name !== '' & req.body.surname !== '' & req.body.email !== '' & req.body.password !== '' ) {
    const person = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    }
    let json = JSON.stringify(person);
    localStorage.setItem('person', json)
    res.redirect('/');
  } else {
    res.render('error');
  }
});

expresApp.listen(3000, () => {
  console.log('port 3000');
})



