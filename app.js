const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '6293917b1b3d02712406e477',
  };
  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => res.status(404).send({ message: 'Страница не найдена' }));

app.listen(PORT);
