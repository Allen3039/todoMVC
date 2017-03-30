<template>
  <div id="main">
    <!--<div class="side-bar">-->
      <!--<Menu theme="dark" active-key="1">-->
        <!--<Menu-item key="1">-->
          <!--<Icon type="ios-compose"></Icon>-->
          <!--任务-->
        <!--</Menu-item>-->
        <!--<Menu-item key="2">-->
          <!--<Icon type="search"></Icon>-->
          <!--搜索-->
        <!--</Menu-item>-->
      <!--</Menu>-->
    <!--</div>-->
    <div class="body">
      <div class="header">
        <div class="date-pick-wrapper">
          <div class="date-pick-show">
            <span id="date-show" v-text="dateRange|dateFMT"></span>
            <i class="icon icon-angle-left" @click="changeDate(-1)"></i>
            <i class="icon icon-angle-right" @click="changeDate(1)"></i>
          </div>
          <div class="date-pick">
            <span class="today" :class="{'active':isToday}" @click="setToday">今天</span>
            <ul class="type-pick">
              <li @click="setDateType('DAY')" :class="{active:dateType==='day'}">日</li>
              <li @click="setDateType('WEEK')" :class="{active:dateType==='week'}">周</li>
              <li @click="setDateType('MONTH')" :class="{active:dateType==='month'}">月</li>
            </ul>
          </div>
        </div>
        <div class="task-type">
          <div class="select-wrapper">
            <i-select style="width:100px" :model.sync="taskType">
              <i-option value="ALL">全部</i-option>
              <i-option value="DONE">已完成</i-option>
              <i-option value="UNDONE">未完成</i-option>
            </i-select>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-wrapper">
          <div class="rank1">
            <task :task-rank="1" :date-range="dateRange" :task-type="taskType"></task>
          </div>
          <div class="rank3">
            <task :task-rank="3" :date-range="dateRange" :task-type="taskType"></task>
          </div>
        </div>
        <div class="right-wrapper">
          <div class="rank2">
            <task :task-rank="2" :date-range="dateRange" :task-type="taskType"></task>
          </div>
          <div class="rank4">
            <task :task-rank="4" :date-range="dateRange" :task-type="taskType"></task>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  import task from './components/task/task.vue';
  import {formatDate, getTodayRange} from 'common/js/util';
  const DATE_TYPE_DAY = 'day';
  const DATE_TYPE_WEEK = 'week';
  const DATE_TYPE_MONTH = 'month';
  const MSEC_OF_DAY = 1 * 24 * 60 * 60 * 1000;
  export default {
    data() {
      return {
        taskType: 'ALL',
        dateRange: [],
        dateType: '' // day week month
      };
    },
    components: {
    	task
    },
    created() {
    	this.dateType = DATE_TYPE_DAY;
    	this.dateRange = getTodayRange();
    },
    computed: {
    	isToday() {
    		return this.dateType === DATE_TYPE_DAY && (new Date()).toDateString() === new Date(this.dateRange[0]).toDateString();
      }
    },
    methods: {
    	setDateType(dateType) {
    		let _dateRange = [];
    		let dateRange = this.dateRange;
    		this.dateType = dateType.toLowerCase();
    		switch (dateType) {
          case 'DAY':
          	_dateRange.push(dateRange[0]);
          	_dateRange.push(dateRange[0] + MSEC_OF_DAY - 1000);
          	break;
          case 'WEEK':
            var day = new Date(dateRange[0]).getDay();
            day = (day === 0 ? 7 : day);
            _dateRange.push(dateRange[0] - (day - 1) * MSEC_OF_DAY);
            _dateRange.push(dateRange[0] + (8 - day) * MSEC_OF_DAY - 1000);
            break;
          case 'MONTH':
            let date = new Date(dateRange[0]);
            let firstDay = +new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
            _dateRange.push(firstDay);
            _dateRange.push(lastDay);
            break;
        }
        this.dateRange = _dateRange;
      },
      setToday() {
        this.dateType = DATE_TYPE_DAY;
        this.dateRange = getTodayRange();
      },
      changeDate(flag) {
        const NEXT_FLAG = 1;
        const PRE_FLAG = -1;
        let _dateRange = [];
        let dateRange = this.dateRange;
        let daySpan = 7;
        if (flag === PRE_FLAG) {
          switch (this.dateType) {
            case DATE_TYPE_DAY:
              daySpan = 1;
              //  falls through
            case DATE_TYPE_WEEK:
              _dateRange.push(dateRange[0] - daySpan * MSEC_OF_DAY);
              _dateRange.push(dateRange[1] - daySpan * MSEC_OF_DAY);
              break;
            case DATE_TYPE_MONTH:
              let date = new Date(dateRange[0]);
              let firstDay = +new Date(date.getFullYear(), date.getMonth() - 1, 1);
              let lastDay = +new Date(date.getFullYear(), date.getMonth(), 0);
              _dateRange.push(firstDay);
              _dateRange.push(lastDay);
              break;
          }
        } else if (flag === NEXT_FLAG) {
          switch (this.dateType) {
            case DATE_TYPE_DAY:
              daySpan = 1;
            //  falls through
            case DATE_TYPE_WEEK:
              _dateRange.push(dateRange[0] + daySpan * MSEC_OF_DAY);
              _dateRange.push(dateRange[1] + daySpan * MSEC_OF_DAY);
              break;
            case DATE_TYPE_MONTH:
              let date = new Date(dateRange[0]);
              let firstDay = +new Date(date.getFullYear(), date.getMonth() + 1, 1);
              let lastDay = +new Date(date.getFullYear(), date.getMonth() + 2, 0);
              _dateRange.push(firstDay);
              _dateRange.push(lastDay);
              break;
          }
        }
        this.dateRange = _dateRange;
      }
    },
    filters: {
      dateFMT(dateRange) {
        if (Array.isArray(dateRange) && dateRange.length === 2) {
          return formatDate(dateRange[0]) + '~' + formatDate(dateRange[1]);
        }
      }
    }
  };
</script>

<style rel="stylesheet/stylus" lang="stylus">
  borderColor = #d9d9d9;
  hoverColor = #2BBFF3;
  #main
    .body
      display flex
      flex 1
      flex-direction column
      height 100vh
      .header
        display flex
        flex-basis 45px
        padding 0 20px
        border-bottom 1px solid borderColor
        .date-pick-wrapper
          flex 1
          .date-pick-show
            display inline-block
            vertical-align top
            #date-show
              display inline-block
              width 200px
              vertical-align  top
              font-size 16px
              line-height 45px
            .icon
              padding 0 5px
              font-size 24px
              line-height 45px
              cursor pointer
              user-select none
           .date-pick
              display inline-block
              margin-left 5px
              .today
                position: relative
                top 9px
                vertical-align top
                display inline-block
                padding 2px 12px
                border 1px solid borderColor
                border-radius 2px
                line-height 24px
                cursor pointer
                &:hover
                  background hoverColor
                  border-color hoverColor
                &.active
                  background hoverColor
                  border-color hoverColor
              ul.type-pick
                position: relative;
                top 9px
                display inline-block
                list-style none
                line-height 24px
                li
                  float left
                  padding 2px 12px
                  border-top 1px solid borderColor
                  border-bottom 1px solid borderColor
                  border-right 1px solid borderColor
                  cursor pointer
                  &:hover
                    background hoverColor
                    border-color hoverColor
                  &:first-child
                    border-left 1px solid borderColor
                    border-top-left-radius 2px
                    border-bottom-left-radius 2px
                  &:last-child
                    border-top-right-radius 2px
                    border-bottom-right-radius 2px
                  &.active
                    background hoverColor
                    border-color hoverColor
        .task-type
          flex-basis 100px
          display flex
          .select-wrapper
            align-self center
      .content
        display flex
        flex 1
        .left-wrapper
          display flex
          flex 1
          flex-direction column
          width 50%
          .rank1
            flex 1
            border-bottom 1px solid borderColor
            border-right 1px solid borderColor
          .rank3
            flex 1
            border-right 1px solid borderColor
        .right-wrapper
          display flex
          flex 1
          flex-direction column
          width 50%
          .rank2
            flex 1
            border-bottom 1px solid borderColor
          .rank4
            flex 1
</style>
