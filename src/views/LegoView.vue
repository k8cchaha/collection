<template>
  <div>
    <!-- <h1>LEGO</h1> -->
    <!-- <div class="number-row">
      <label for="photoCount">Photos : </label>
      <select v-model="photosPerRow" id="photoCount">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div> -->
    <div class="filter">
      <div>
        <button type="button" class="filter-first-btn" :class="{ select: mode === 'place' }" @click="switchMode('place')">場景模式</button>
        <button type="button" :class="{ select: mode === 'data' }" @click="switchMode('data')">資料模式</button>
      </div>
      <div v-if="mode === 'place'">
        <div class="dropdown-set">
          <div class="dropdown-title">場景切換：</div>
          <Dropdown :list="placeList" @updateSelectPlace="updateSelectPlace"/>
        </div>
      </div>
      <div v-if="mode === 'data'">
        
      </div>
    </div>
    <div v-show="mode === 'place'">
      <div class="content">
        <div class="main-pic">
          <img :src="selectedPlace.imgUrl" />
        </div>
        <div class="gap"></div>
        <div class="sub-pic">
          <div>
            <div>
              <label for="detailList">圖片中盒組列表： </label>
            </div>
            <select v-model="selectDetail" id="detailList">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div v-show="mode === 'data'" class="photo-grid" :style="{ gridTemplateColumns: `repeat(${photosPerRow}, 1fr)` }">
      <LegoItem v-for="item in legoList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import LegoItem from '../components/LegoItem.vue';
import Dropdown from '../components/Dropdown.vue';
import { mapState } from 'pinia';
import { useDeviceStore } from '../stores/useDeviceStore';
import { legoList } from '../data/lego.js';
import { placeList } from '../data/place.js';

export default {
  name: 'LegoView',
  components: {
    LegoItem,
    Dropdown
  },
  data() {
    return {
      mode: 'place',
      photosPerRow: 3,
      legoList: legoList,
      placeList: placeList,
      selectedPlace: placeList[0],
      tempPerRow: 0,
      allLego: []
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
  methods: {
    async getLegoInfo() {
      try {
        const response = await fetch('/data/lego.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // this.allLego = data.map((obj)=>{
        //   return {
        //     set: obj.set.split('-')[0],
        //     name: 
        //   }
        // })

        console.log('!!!!', data)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    switchMode(mode){
      this.mode = mode;
    },
    updateSelectPlace(val) {
      this.selectedPlace = val
      console.log(this.selectedPlace)
    },
    updateDetailList() {

    }
  },
  mounted() {
    this.getLegoInfo();
  },
}
</script>

<style scoped>
.filter {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter button {
  border-radius: 0;
  border: 1px var(--secondary-color) solid;
  color: var(--secondary-color);
  background-color: white;
}
.filter button:hover, .filter button.select {
  background-color: var(--secondary-color);
  color: white;
}
.dropdown-set {
  display: flex;
  align-items: center;
}
.dropdown-title {
  height: 38px;
  line-height: 38px;
  background-color: white;
  border: 1px solid var(--primary-color);
  border-radius: 5px 0 0 5px ;
  padding: 0 10px 0 20px;
}
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
.content {
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: stretch;
}
.main-pic {
  flex: 0 0 70%;
}
.main-pic img {
  max-width: 100%;
  vertical-align: middle;
}
.gap {
  flex: 0 0 2%;
}
.sub-pic {
  flex: 0 0 28%;

}

@media (max-width: 768px) {
  .number-row {
    display: none;
  }
  .filter-first-btn {
    display: block;
  }
  .dropdown-set {
    flex-direction: column;
  }
  .dropdown-title {
    width: 158px;
    padding: 0;
    text-align: center;
    border-radius: 5px 5px 0 0;
  }
  .main-pic {
    flex: 0 0 100%;
  }
  .content {
    flex-direction: column;
  }
}

</style>