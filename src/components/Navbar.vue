<template>
  <header>
    <div class="logo" @click="goHome">Alex's Collection</div>
    <nav v-if="!isMobile">
      <router-link to="/">HOME</router-link> | 
      <router-link to="/lego">LEGO</router-link> | 
      <router-link to="/card">NBA CARD</router-link> | 
      <router-link to="/gk">GK</router-link> | 
      <router-link to="/toys">TOYS</router-link>
    </nav>
    <router-link to="/about" class="about" v-if="!isMobile">About Me</router-link>
    <button class="menu-button" @click="toggleMenu" v-show="isMobile">☰</button>
    <DrawerMenu :visible="menuOpen && isMobile" @update:visible="menuOpen = $event" />
  </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DrawerMenu from './DrawerMenu.vue';

export default {
  name: 'Navbar',
  components: {
    DrawerMenu
  },
  setup() {
    const router = useRouter();
    const menuOpen = ref(false);
    const isMobile = ref(window.innerWidth < 768);

    function goHome() {
      router.push('/');
    }

    function toggleMenu() {
      menuOpen.value = !menuOpen.value;
    }

    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < 768
    });

    return { goHome, toggleMenu, menuOpen, isMobile };
  }
}
</script>

<style scoped>
header {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.logo {
  font-size: 24px;
  cursor: pointer;
  flex-grow: 0;
}

nav {
  display: flex;
  justify-content: center;
  flex-grow: 1; /* Ensures that nav takes up the available space */
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: white;
}

nav a:hover {
  color: var(--secondary-color);
}

nav router-link:hover {
  text-decoration: underline;
}

.about {
  text-decoration: none;
  color: white;
}

.about:hover {
  text-decoration: underline;
}
</style>