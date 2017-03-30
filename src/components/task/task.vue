<template>
  <div class="task">
    <div class="task-add" :class="classMap[taskRank]">
      <span class="task-description">{{textMap[taskRank]}}</span>
      <Icon type="plus" @click.stop="showInput"></Icon>
    </div>
    <div class="task-input" v-show="addInputShow" v-clickoutside="handleClose"  >
      <i-input icon="checkmark" placeholder="输入任务描述,按回车键完成" v-on:on-enter="addTask" v-on:on-click="addTask" :value.sync="title"></i-input>
      <Date-picker type="daterange"  placeholder="选择日期" @click.stop :value.sync="taskDateRange"></Date-picker>
    </div>
    <div class="task-list">
      <i-table :columns="columns" :data="taskList" :height="height"></i-table>
    </div>
  </div>
  <!--<i-input placeholder="输入任务描述,按回车键完成" icon="happy-outline"></i-input>-->
</template>

<script text="text/ecmascript-6">
  import clickoutside from 'components/directives/clickoutside';  //  wonderful
  import {formatDate, getTodayRange} from 'common/js/util.js';
  const MSG_STATUS_OK = 1;
  const TASK_UNDONE = 0;
  //  const TASK_DONE = 1;
  export default {
  	props: {
  		taskRank: {
  			type: Number,
        required: true
      },
      dateRange: {
  			type: Array,
        required: true
      },
      taskType: {
  			type: String,
        required: true
      }
    },
    directives: {
      clickoutside
    },
    data() {
  		return {
  			title: '',
  			addInputShow: false,
        height: 0,
        taskDateRange: [],
        taskList: [
        ],
        columns: [
          {
          	title: '任务名',
            key: 'title'
          },
          {
          	title: '开始时间',
            key: 'startTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
          	title: '操作',
            key: 'state',
            render (row, column, index) {
          		let state = row.state;
          		if (state === 1) {
          			return `<i-button type="primary" size="small">查看</i-button><i-button type="error" size="small" @click="removeTask(${index})">删除</i-button>`;
              } else {
                return `<i-button type="success" size="small" @click="finishTask(${index})">完成</i-button><i-button type="error" size="small" @click="removeTask(${index})">删除</i-button>`;
              }
            }
          }
        ]
      };
    },
    created() {
  		this.classMap = [null, 'error', 'warn', 'info', 'success'];
  		this.textMap = [null, '很重要-很紧急', '重要不紧急', '不重要-紧急', '不重要-不紧急'];
  		this.taskDateRange = getTodayRange();
      this.getTasks();
//      this.getTasks((response) => {
//      	console.log('this is ', this);
//      	console.log(response);
//      });
    },
    ready() {
      console.log(document.getElementsByClassName('task')[0].offsetHeight);
      this.height = document.getElementsByClassName('rank' + this.taskRank)[0].offsetHeight - 50;
    },
    watch: {
  		'dateRange': function() {
  			console.log('dateRange changing');
  			this.getTasks();
      },
      'taskType': function() {
        console.log('dateType changing');
        this.getTasks();
      }
    },
    methods: {
      showInput() {
      	console.log('添加dsa');
      	if (!this.addInputShow) {
          this.addInputShow = true;
        }
        let that = this;
        this.$nextTick(() => {
          that.disableClickOutSide = true;
        });
      },
      handleClose() {
        if (this.disableClickOutSide) {
          console.log('关闭');
          if (this.addInputShow) {
            this.addInputShow = false;
          }
        }
      },
      getTasks(callback) {
      	let dateRange = this.dateRange;
      	let taskRank = this.taskRank;
      	let taskType = this.taskType;
      	this.$http.get('/api/todoList', {
          params: {
            dateRange: {
            	dateStart: (new Date(dateRange[0])).toISOString(),
              dateEnd: (new Date(dateRange[1])).toISOString()
            },
            taskRank,
            taskType
          }
        }).then(response => {
          let data = response.body;
          if (data.status === MSG_STATUS_OK) {
            let taskArrays = data.data.docs;
            this.taskList = taskArrays.map((item) => {
              return {
                id: item._id,
                title: item.title,
                startTime: formatDate(new Date(item.startTime)),
                endTime: formatDate(new Date(item.endTime)),
                state: item.state
              };
            });
            callback && callback(response);
          }
        });
      },
      addTask() {
      	console.log('addTask...');
      	this.addInputShow = false;
      	let taskDateRange = this.taskDateRange;
        let title = this.title;
        let rank = this.taskRank;
        this.title = '';
      	this.$http.post('/api/todo', {
      		title,
          description: '',
          startTime: new Date(taskDateRange[0]).toISOString(),
          endTime: new Date(taskDateRange[1]).toISOString(),
          rank,
          'state': TASK_UNDONE
        }).then(response => {
        	let data = response.body;
        	if (data.status === MSG_STATUS_OK) {
        		this.getTasks();
          }
        });
      },
      finishTask(index) {
      	let id = this.taskList[index].id;
      	this.$http.put('/api/todo', {
      		id,
          state: 1
        }).then(response => {
        	if (response.body.status === MSG_STATUS_OK) {
            this.getTasks();
          }
        });
      },
      removeTask(index) {
      	console.log(index);
      	let id = this.taskList[index].id;
      	this.$http.delete('/api/todo', {
      		params: {
      			id
          }
        }).then((response) => {
          let status = response.body.status;
          if (status === MSG_STATUS_OK) {
            this.getTasks();
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  .task
    position relative
    height 100%
    .task-add
      display flex
      font-size 16px
      padding 10px
      .task-description
        flex 1
      .ivu-icon-plus
        color #819298
        line-height 24px
        cursor pointer
      &.error
        background-color: #FFEDE7
        color: #F76332
      &.warn
        background-color: #FFEFCB
        color: #FEAE6A
      &.info
        background-color: #D6F4FE
        color: #3FB6DA
      &.success
        background-color: #EFD;
        color: #89C557;
    .task-input
      position absolute
      z-index 1000
      width 100%
</style>
