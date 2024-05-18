<template>
  <div>
    <h1>Lego Collection</h1>
    <div>
      <label for="photoCount">Photos per row:</label>
      <select v-model="photosPerRow" id="photoCount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
    <div class="photo-grid" :style="{ gridTemplateColumns: `repeat(${photosPerRow}, 1fr)` }">
      <LegoItem v-for="item in legoList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import LegoItem from '../components/LegoItem.vue'
import { legoList } from '../data/lego.js'

export default {
  name: 'LegoView',
  components: {
    LegoItem
  },
  data() {
    return {
      photosPerRow: 3,
      legoList: legoList
    };
  }
}
</script>

<style scoped>
.photo-grid {
  display: grid;
  gap: 16px;
  margin-top: 20px;
}
</style>