<template>
  <v-app-bar flat>
    <v-app-bar-title class="app-bar-title" @click="goToHome">
      <v-icon icon="mdi-circle-slice-4" />

      ToDo
    </v-app-bar-title>

    <v-btn to="/chatroom">채팅방</v-btn>

    <v-btn to="/signup">회원가입</v-btn>

    <v-btn to="/signin">로그인</v-btn>
  </v-app-bar>
</template>

<script>
import router from "@/router";

export default {
  setup() {
    const goToHome = () => {
      router.push("/");
    };

    return {
      goToHome,
    };
  },
};
</script>

<style scoped>
.app-bar-title {
  cursor: pointer;
}
</style>
