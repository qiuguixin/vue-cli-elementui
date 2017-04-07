import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//define theme
//import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import './assets/theme/theme-darkblue/index.css'
import VueRouter from 'vue-router'
//import store from './vuex/store'
//import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
import 'font-awesome/css/font-awesome.min.css'

NProgress.configure({ showSpinner: false });
//Mock.bootstrap();
Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
