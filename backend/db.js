const { Schema, createConnection } = require('mongoose');
const connection = createConnection(
  'mongodb://localhost:27017/first-mevn-stack',
  { useNewUrlParser: true }
);

const userSchema = new Schema({
  name: String,
  password: String,
});

const User = connection.model('User', userSchema);

const toDoSchema = new Schema({
  name: String,
  done: Boolean,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ToDo = connection.model('ToDo', toDoSchema);

module.exports = {
  User,
  ToDo,
};
