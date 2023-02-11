<template>
  <div class="home">
    <Navbar />
    <div class="body_container"></div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'HomeView',
  components: {
    Navbar
  }
}
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
}
.body_container {
  width: 100%;
  height: calc(100% - 80px);
}
</style>
