<template>
  <div>
    <h1>LEGO</h1>
    <div class="number-row">
      <label for="photoCount">Photos : </label>
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
import { mapState } from 'pinia';
import { useDeviceStore } from '../stores/useDeviceStore';
import { legoList } from '../data/lego.js';

export default {
  name: 'LegoView',
  components: {
    LegoItem
  },
  data() {
    return {
      photosPerRow: 3,
      legoList: legoList,
      tempPerRow: 0
    };
  },
  computed: {
    ...mapState(useDeviceStore, ['isMobile']),
  },
  watch: {
    isMobile: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.tempPerRow = this.photosPerRow;
          this.photosPerRow = 1;
        } else {
          this.photosPerRow = this.tempPerRow? this.tempPerRow: 3;
        }
      },
      immediate: true,
    }
  },
}
</script>

<style scoped>
.photo-grid {
  display: grid;
  gap: 16px;
  margin-top: 10px;
}

.number-row {
  position: absolute;
    right: 20px;
    top: 80px;
}

@media (max-width: 768px) {
  .number-row {
    display: none;
  }
}

</style>