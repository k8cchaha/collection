<template>
  <div class="form-container">
    <form>
    <!-- <form @submit.prevent="submitForm"> -->
      <table>
        <thead>
          <tr>
            <th>圖片</th>
            <th>編號</th>
            <th>名稱</th>
            <th>售價</th>
            <th>全新</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayList" :key="item.set">
            <td class="img-cell"><img :src="useSmallPic(item.mainImg)" alt=""></td>
            <td>{{ item.set }}</td>
            <td>{{ item.title }}</td>
            <td>趕工中</td>
            <td>{{ isNew(item.new) }}</td>
          </tr>
          <tr>
            <td colspan="5">
              {{ `${pickupStr} | 總售價: ${total} | 報價: ${price}` }}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <button type="button" @click="addItem">添加項目</button>
      <button type="submit">提交</button> -->
    </form>
  </div>
</template>

<script>
import { useUserStore } from '../stores/useUserStore';

export default {
  name: 'ShopList',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    isMyList: Boolean,
    category: String
  },
  data() {
    return {
      isOpen: false,
      selectedOption: null,
      userStore: useUserStore(),
      total: '趕工中',
      price: '趕工中'
    };
  },
  computed: {
    displayList() {
      if (this.isMyList && this.userStore.isLogin) {
        return this.list.filter((item)=>{
          return this.userStore.userList.includes(Number(item.set))
        });
      } else {
        if (this.category) {
          return this.list.filter((item)=>{
            return item.theme.includes(this.category)
          });
        } else {
          return this.list;
        }
      }
    },
    pickupStr() {
      return (this.userStore.pickup)? '自取: 可': '自取: 無'
    }
  },
  methods: {
    useSmallPic(url) {
      return url.replace('large', 'thumb').replace('jpg', 'png')
    },
    isNew(num) {
      return num > 0 ? '是': '否'
    }
  }
};
</script>

<style scoped>
.form-container {
  /* max-width: 600px; */
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th, td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3;
}

.img-cell {
  max-width: 60px;
}
.img-cell img {
  width: 60px;
}

@media (max-width: 768px) {
  .login {
    margin-right: 10px;
  }
  .img-cell {
  max-width: 30px;
}
.img-cell img {
  width: 30px;
}
}
</style>