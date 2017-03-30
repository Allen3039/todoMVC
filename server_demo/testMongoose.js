/**
 * Created by Administrator on 2017-3-25.
 */
let mongoose = require('mongoose');
const DBNAME = 'todoDB';
mongoose.connect('mongodb://localhost/' + DBNAME);
let db = mongoose.connection;
db.on('error', () => {
  console.log('error');
});
db.once('open', () => {
  console.log('connect to DB:' + DBNAME + ' success!');
});

