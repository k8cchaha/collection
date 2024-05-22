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
        <button type="button" :class="{ select: mode === 'place' }" @click="switchMode('place')">場景模式</button>
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
              <label for="detailList">圖中盒組列表： </label>
            </div>
            <select v-model="selectDetail" id="detailList">
              <option v-for="(item, index) in selectedPlace.detailList" :value="index">{{ item.set }} {{ item.title }}</option>
            </select>
            <div v-if="selectedPlace.detailList" class="detail-view">
              <img class="main-img" :src="selectDetailObj.mainImg" alt="">
              <div class="sub-imgs">
                <img v-for="imgUrl in selectDetailObj.subImgs" :src="imgUrl" :key="imgUrl" alt=""
                 @click="clickSubImg(imgUrl)">
              </div>
              <div class="detail-title">{{ selectDetailObj.name }}</div>
              <hr>
              <div>
                <b>系列：</b>
                <span>{{ displayTheme }}</span>
              </div>
            </div>
          </div>
          <div class="next">
                <button @click="next">下一筆</button>
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
      selectDetail: 0,
      selectDetailIdx: 0,
      tempPerRow: 0,
      allLego: []
    };
  },
  computed: {
    ...mapState(useDeviceStore, ['isMobile']),
    selectDetailObj() {
      return this.selectedPlace.detailList[this.selectDetail]
    },
    displayTheme() {
      return this.selectDetailObj.theme.join(' & ')
    }
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
      const imgSource = 'https://www.brickeconomy.com';

      try {
        const response = await fetch('/data/lego.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.allLego = data.map((obj)=>{
          return {
            set: obj.Set.split('-')[0],
            name: obj.Name,
            title: obj.Title,
            grown: obj.Growth,
            theme: obj.Theme.split(' \/ '),
            mainImg: imgSource + obj['main-img'],
            subImgs: obj['sub-imgs'].map((url)=>{
              return imgSource + url;
            })
          }
        })
        this.updateDetailList();

        if (localStorage) {
          localStorage.setItem('lego', JSON.stringify(this.allLego))
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    switchMode(mode){
      this.mode = mode;
    },
    updateSelectPlace(val) {
      this.selectedPlace = val;
      this.updateDetailList()
    },
    updateDetailList() {
      this.selectedPlace.detailList = []
      this.allLego.forEach((item)=> {
        if (this.selectedPlace.list.includes(Number(item.set))) {
          this.selectedPlace.detailList.push(item);
        }
      })
      this.selectDetail = 0;
    },
    clickSubImg(url) {
      const newUrl = url.replace('thumb', 'large').replace('png', 'jpg')
      this.selectDetailObj.mainImg = newUrl;
    },
    next() {
      this.selectDetail = (this.selectDetail == this.selectedPlace.detailList.length-1)? 0 : this.selectDetail+1;
    }
  },
  mounted() {
    if (localStorage && localStorage.getItem('lego')) {
      this.allLego = JSON.parse(localStorage.getItem('lego'));
      this.updateDetailList();
    } else {
      this.getLegoInfo();
    }    
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
  width: 100%;
  vertical-align: middle;
}
.gap {
  flex: 0 0 2%;
}
.sub-pic {
  flex: 0 0 28%;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 640px;
}
#detailList {
  margin: 5px 0;
  width: 100%;
  height: 28px;
  font-size: 16px;
}
.detail-view {
  text-align: center;
}
.detail-view .main-img {
  max-width: 100%;
  max-height: 35vh;
}
.detail-view .sub-imgs {
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px;
  height: 72px;
}
.detail-view .sub-imgs img {
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
}
.detail-title {
  font-family: 'Comic Neue', cursive;
  font-weight: 700;
  font-style: normal;
  margin: 10px 5px;
  font-size: 20px;
}
.next {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}
.next button {
  width: 100%;
  height: 35px;
  line-height: 35px;
  padding: 0;
}

hr {
  width: 100%;
  display: block;
  border-style: inset;
  border-width: 1px;
}

@media (max-width: 768px) {
  .number-row {
    display: none;
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