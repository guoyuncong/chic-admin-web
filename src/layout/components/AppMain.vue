<template>
  <div class="app-main">
    你好
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
}
</style>
