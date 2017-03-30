let express = require('express');
let ObjectId = require('mongodb').ObjectId;
let http = require('http');
let path = require('path');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let db = require('./db');

const MSG_STATUS_OK = 1;
const MSG_STATUS_ERROR = 0;
const TASK_TYPE_DONE = 'DONE';
const TASK_TYPE_UNDONE = 'UNDONE';
// let msgTemplate= {
//   status :
//   msg: '',
//   data: {
// }
// };
router.get('/todoList', (req, res) => {
  let query = req.query;
  console.log(query);
  db.todo.find({
    rank: parseInt(query.taskRank),
    state: {$in: query.taskType === TASK_TYPE_UNDONE ? [0] : (query.taskType === TASK_TYPE_DONE ? [1] : [0, 1]) },
    startTime: {$gte: query.dateRange.dateStart},
    endTime: {$lte: query.dateRange.dateEnd}
  }, (err, docs) => {
    if (err) {
      console.log(err);
    }else if (docs) {
      res.json({
        status: MSG_STATUS_OK,
        msg: '',
        data: {
          docs
        }
      })
    }
  });
});

router.post('/todo', (req, res) => {
  console.log(req.body);
  let {id, rank, title, description, startTime, endTime, state} = req.body;
  if (id !== undefined) {
    db.todo.findByIdAndUpdate(id, {title, description, startTime, endTime, state}, (err) =>{
      if (err) {
        console.log('err',err);
      }else {
        res.json({
          status: MSG_STATUS_OK,
          msg: '',
          data: {}
        });
      }
    });
  }else {
    db.todo.insertMany({
      rank,
      title,
      description,
      startTime,
      endTime,
      state
    }, () => {
      let msg = {
        status: MSG_STATUS_OK,
        msg: 'create new task success'
      };
      res.json(msg);
    }, (err) => {
      res.json({
        status: MSG_STATUS_ERROR,
        msg: err.messages()
      })
    })
  }
});
router.put('/todo', (req, res) => {
  let {id, state} = req.body;
  db.todo.findByIdAndUpdate(id,{$set: {state: state}}, (err, tank) => {
    if (err) {
      res.json({
        status: MSG_STATUS_ERROR,
        msg: err.messages()
      });
    } else if (tank) {
      res.json({
        status: MSG_STATUS_OK,
        msg: '',
        tank
      });
    }
  });
})
router.delete('/todo', (req, res) => {
  db.todo.remove({_id: req.query.id}, (err) => {
    if (!err) {
      res.json({
        status: MSG_STATUS_OK,
        msg: '删除成功'
      });
    }
  });
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);
app.use(express.static('../dist'));
http.createServer(app).listen(8081);
// router.post('/todo',)


