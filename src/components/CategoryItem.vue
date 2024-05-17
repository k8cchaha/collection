<template>
  <div class="photo-item" @click="$router.push('/lego')">
    <img :src="imgUrl" :alt="name">
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    imgUrl: String,
    name: String
  }
}
</script>

<style scoped>
.photo-item img {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.photo-item:hover img {
  transform: scale(1.05);
}
</style>