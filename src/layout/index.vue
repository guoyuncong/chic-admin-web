<template>
  <div class="app-wrapper">
    <div class="left">
      <Navbar />
    </div>
    <app-main />
  </div>
</template>

<script>
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
}
</style>
