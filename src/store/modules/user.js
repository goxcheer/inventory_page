import Ajax from '@/lib/ajax/index.js'
import {setToken, getToken} from "../../lib/util/util";

const state = {
  oUserInfo: {
    id: 0,
    userName: '',
    access:[]
  },
  hasGetInfo: false,
  token: getToken()
}

const getters = {

}

const mutations = {
  setToken(state, data){
    state.token = data;
    setToken(data);
  },
  setUserInfo(state, data){
    state.oUserInfo = {
      id: data.id,
      userName: data.userName,
      access: data.access
    }
  }
}

const actions = {
  /**
   * 用户登陆
   * @param commit
   * @param paramData
   */
  login({commit}, paramData){
    return new Promise((resolve,reject) => {
      //Ajax
        commit('setToken','goxcheer');
        resolve();
    })
  },

  /**
   * 获取用户的信息
   * @param commit
   * @param paramData
   */
  getUserInfo({commit}, paramData){
    return new Promise((resolve, reject) => {
    /*  Ajax.$ajax({
        url:'',
        data:paramData,
        success(data){
          if(data.result=='true'){
            commit('setUserInfo',data.ext);
            resolve(data);
          }
        }
      });*/
    commit('setUserInfo',{id:1, userName:'goxcheer', access: ['admin']})
      resolve({result:'true',user:{id:1, userName:'goxcheer', access: ['admin']}});
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

