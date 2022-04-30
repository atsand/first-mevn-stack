var express = require('express');
var router = express.Router();
const { ToDo } = require('../db');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

const verifyToken = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization, SECRET);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(401);
  }
};

router.get('/', verifyToken, async (req, res) => {
  const { _id } = req.user;
  const toDos = await ToDo.find({ user: _id });
  res.json(toDos);
});

router.get('/:id', verifyToken, async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const toDo = await ToDo.findOne({ _id: id, user: _id });
  res.json(toDo);
});

router.post('/', verifyToken, async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  const toDo = new ToDo({ name, done: false, user: _id });
  res.json(toDo);
});

router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, done } = req.body;
  const toDo = await ToDo.findOneAndUpdate({ _id: id }, { name, done });
  await toDo.save();
  res.json(toDo);
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  await ToDo.deleteOne({ _id: id });
  res.status(200).send();
});

module.exports = router;
