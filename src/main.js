import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(iView);
var router = new VueRouter({
  linkActiveClass: 'active'
});
console.log('test aa');
router.start(App, '#app');
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// });
