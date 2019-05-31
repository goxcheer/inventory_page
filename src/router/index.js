import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import store from '@/store'
import {setToken, getToken, turnTo} from '@/lib/util/util.js'
import config from '@/config'
const {homeName, LOGIN_PAGE_NAME } = config

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})


router.beforeEach((to, from, next) => {
   iView.LoadingBar.start()
   const token = getToken();
    //未登录且跳转页面不为登陆页面
   if (!token && to.name !== LOGIN_PAGE_NAME){
      next({
        name: LOGIN_PAGE_NAME //跳转到登陆页面
      })
     }else if (!token && to.name == LOGIN_PAGE_NAME){
     //未登陆且跳转页面为登陆页面
     next()
   } else if (token && to.name == LOGIN_PAGE_NAME){
     //已登陆且跳转的页面为登陆页面
     next({
       name: homeName
     })
   }else {
      if (store.state.user.hasGetInfo){
        turnTo(to, store.state.user.oUserInfo.access, next);
      } else {
        store.dispatch('getUserInfo').then(data => {
          if (data.result){
            // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
            turnTo(to, data.user.access, next)
          } else {
            setToken('');
            next({
              name: LOGIN_PAGE_NAME
            })
          }
        })
      }
   }
   })

router.afterEach(to => {
  iView.LoadingBar.finish()
})

export default router






