import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref({});
    const isLogined = ref(false);

    function login(saveUser) {
      user.value = saveUser;
      isLogined.value = true;
    }

    function getUser() {
      return user.value;
    }

    function getIsLogined() {
      return isLogined.value;
    }

    function logout() {
      user.value = {};
      isLogined.value = false;
    }

    return { user, isLogined, login, logout, getUser, getIsLogined };
  },
  { persist: true }
);
