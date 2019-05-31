<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import config from '@/config'
  const {title} = config
export default {
  name: 'App'
}
</script>

<style type="text/less"  lang="less">
  @import './assets/css/index.less';
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*background: #F2F2F2;*/
    text-align: left;
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
</style>
