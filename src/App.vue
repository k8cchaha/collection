<template>
  <Navbar />
  <div class="main-container">
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<style>
  .main-container {
    padding: 50px 20px 0 20px;
  }
</style>