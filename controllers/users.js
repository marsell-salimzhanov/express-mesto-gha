const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные некорректны' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ usersList: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID пользователя некорректное' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

module.exports.editProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send({ updatedUser: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные некорректные' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((newAvatarLink) => res.send({ updatedAvatar: newAvatarLink }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные некорректные' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
};
