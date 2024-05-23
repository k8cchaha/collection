<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <h2>登入</h2>
      <input type="text" v-model="username" placeholder="帳號" />
      <div class="modal-buttons">
        <button @click="closeModal">取消</button>
        <button @click="login">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/useUserStore';

export default {
  data() {
    return {
      showModal: false,
      username: '',
      userStore: useUserStore()
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.username = '';
    },
    login() {
      // 找到
      console.log('XXXX',this.username)
      this.userStore.setUserInfo({
        name: `嗨! ${this.username}`,
        pickup: true,
        list: [10013, 10027]
      })
      console.log(`Logging in with username: ${this.username}`);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  color: var(--primary-color);
  margin-top: 0;
  text-align: center;
}
.modal input {
  font-size: 18px;
  line-height: 30px;
  width: 200px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:first-child {
  border: 1px solid  var(--primary-color);
  background-color: white;
  color: var(--primary-color);
  margin-right: 15px;
}

.modal-buttons button:last-child {
  background-color: var(--primary-color);
  color: white;
  margin-left: 15px;
}
</style>