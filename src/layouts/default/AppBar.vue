<template>
  <v-app-bar flat>
    <v-app-bar-title class="app-bar-title" @click="goToHome">
      <v-icon icon="mdi-circle-slice-4" />

      ToDo
    </v-app-bar-title>

    <div>{{ getIsLogined }}</div>

    <div v-if="!userStore.getIsLogined()">
      <v-btn @click="goToSignUp">회원가입</v-btn>
      <v-btn @click="goToSignIn">로그인</v-btn>
    </div>

    <div v-if="userStore.getIsLogined()">
      <v-chip>{{ userStore.getUser().nickname }}</v-chip>
      <v-btn @click="goToChatRoom">채팅방</v-btn>
      <v-btn @click="logout">로그아웃</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const userStore = useUserStore();

    const router = useRouter();

    const goToHome = () => {
      router.push("/");
    };

    const goToSignUp = () => {
      router.push("/signup");
    };

    const goToSignIn = () => {
      router.push("/signin");
    };

    const goToChatRoom = () => {
      router.push("/chatroom");
    };

    const logout = () => {
      userStore.logout();
      router.push("/");
    };

    return {
      userStore,
      goToHome,
      goToSignUp,
      goToSignIn,
      goToChatRoom,
      logout,
    };
  },
};
</script>

<style scoped>
.app-bar-title {
  cursor: pointer;
}
</style>
