<template>
  <Navbar />
  <div class="main-container">
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
  .main-container {
    padding: 50px 20px 0 20px;
  }

  h1 {
    text-align: center;
    font-family: 'Comic Neue', cursive;
    margin: 15px 0;
  }
</style>