<template>
  <div>
    <Navbar />
    <AppMain />
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

<style scoped>
</style>
