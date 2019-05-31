<template>
  <div id="main">
    <div class="layout">
      <Layout :style="{height: '100vh'}">
        <Sider collapsible :collapsed-width="0" v-model="isCollapsed" width="210">
          <menu-left></menu-left>
        </Sider>
        <Layout>

        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
  import MenuLeft from '@/components/menu-left/MenuLeft.vue'
  import MainHeader from '@/components/header/MainHeader.vue'
  export default {
    name: "Main",
    components:{
      'MenuLeft': MenuLeft,
      'MainHeader': MainHeader
    },
    data() {
      return {
        isCollapsed: false
      }
    }
  }
</script>

<style scoped>

</style>
