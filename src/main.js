

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller';

import './common/stylus/index.styl';   //引入字体图标文件的css
//引入路由模板

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);


const routes = [
	{path:'/',redirect: '/goods'},  //刷新页面定位为goods页面
	{path: '/goods',component: goods},
	{path: '/ratings',component: ratings},
	{path: '/seller',component: seller},
];

const router = new VueRouter({
	routes
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router:router,
  template: '<App/>',
  components: { App }   //app为第一个组件。
})
