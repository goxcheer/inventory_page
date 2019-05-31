// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/css/style.css'
import iView from 'iview'
import store from '@/store/index.js'
import router from './router'
import { Table, TableColumn,Loading} from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading.directive);

Vue.use(iView)

Vue.config.productionTip = false



window.gMain = {
  apiPath:'/'
  ,components:{
    iView:iView
  }
}; //全局变量
//所有api的请求前缀，开发模式和生产的代码前缀不一样，开发是跨域请求，生产代码是当前域请求
// //如果当前是webpack的开发模式
if(process.env.NODE_ENV == "development"){
  gMain.apiPath = '/api';
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
