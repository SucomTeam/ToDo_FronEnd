<template>
  <v-card class="mx-auto" max-width="344" title="회원가입">
    <v-container>
      <v-text-field
        v-model="username"
        :rules="[username_rule]"
        color="primary"
        label="아이디"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        :rules="[password_rule]"
        color="primary"
        label="비밀번호"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="nickname"
        :rules="[nickname_rule]"
        color="primary"
        label="닉네임"
        variant="underlined"
      ></v-text-field>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        block
        color="success"
        size="large"
        type="button"
        variant="elevated"
        @click.prevent="onSubmit"
      >
        회원가입
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const nickname = ref("");

    const onSubmit = () => {
      if (!formValidation()) {
        const formData = {
          username: username.value,
          password: password.value,
          nickname: nickname.value,
        };

        axios
          .post("/api/v1/signup", formData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const formValidation = () => {
      if (username.value === "") {
        alert("아이디를 입력해주세요.");
        return true;
      }

      if (password.value === "") {
        alert("비밀번호를 입력해주세요.");
        return true;
      }

      if (nickname.value === "") {
        alert("닉네임을 입력해주세요.");
        return true;
      }
    };

    const username_rule = (v) => {
      return !!v || "아이디를 입력하세요";
    };

    const password_rule = (v) => {
      return !!v || "비밀번호를 입력하세요";
    };

    const nickname_rule = (v) => {
      return !!v || "닉네임을 입력하세요";
    };

    return {
      // variable
      username,
      password,
      nickname,

      // rules
      username_rule,
      password_rule,
      nickname_rule,

      // method
      onSubmit,
    };
  },
};
</script>

<style></style>
