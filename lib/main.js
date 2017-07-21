'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueResource = require('vue-resource');

var _vueResource2 = _interopRequireDefault(_vueResource);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _iview = require('iview');

var _iview2 = _interopRequireDefault(_iview);

require('iview/dist/styles/iview.css');

require('common/stylus/index.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueResource2.default);
_vue2.default.use(_iview2.default);
var router = new _vueRouter2.default({
  linkActiveClass: 'active'
});
console.log('test aa');
router.start(_App2.default, '#app');

var a = 1;
setTimeout(function () {
  console.log(1);
});
//# sourceMappingURL=main.js.map