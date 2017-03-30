let mongoose = require('mongoose');
const UNDONE = 0;
const DONE = 1;

let todoSchema = mongoose.Schema({
  rank: Number,  //value between 1 and 4
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  state: Number //0:UNDONE 1: DONE
});

let todo = mongoose.model('todo', todoSchema);
// let todoDemo = new todo({
//   title: 'first thing',
//   description: 'say hello to world',
//   state: 0
// });
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todoDB');
let connection = mongoose.connection;
connection.on('err', () => {
  console.log('Connect Error!');
});
connection.on('open', () => {
  console.log('MongoDB Connect OK!')
});

module.exports = {
  todo
}

