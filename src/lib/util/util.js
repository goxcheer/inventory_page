/**
 *@Author: Goxcheer
 *@Date:14:34 2019/5/28
 *@Email:604721660@qq.com
 *@decription: js工具类(业务逻辑)
 */
import Cookies from 'js-cookie'
import config from '@/config'
import {hasOneOf} from './tools'
import routes from '@/router/routers'

const {cookieExpires} = config;

export const TOKEN_KEY = 'token'

/**
 * Cookie设置用户登陆信息
 * @param token
 */
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
}
/**
 * 获取cookie设置的用户
 * @returns {*}
 */
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  return token
}
/**
 * 页面跳转
 * @param to
 * @param access
 * @param next
 */
export const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) { //有权限访问
    next();
  }else {
    next({replace: true, name: 'error_401'}) //没权限，重定向
  }
}
/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
       if (item.children && item.children.length){
         return routePermissionJudge(item.children)
       }else if (item.name === name){
          return hasAccess(access, item);
       }
    })
  }
  return routePermissionJudge(routes);
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}


