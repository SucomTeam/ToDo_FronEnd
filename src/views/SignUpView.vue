<template>
  <v-card class="mx-auto" max-width="344" title="회원가입">
    <v-container>
      <v-text-field
        v-model="username"
        color="primary"
        label="아이디"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="비밀번호"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="name"
        color="primary"
        label="이름"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="nickname"
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
    const name = ref("");
    const nickname = ref("");

    const onSubmit = () => {
      if (!formValidation()) {
        const formData = {
          username: username.value,
          password: password.value,
          name: name.value,
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

      if (name.value === "") {
        alert("이름을 입력해주세요.");
        return true;
      }

      if (nickname.value === "") {
        alert("닉네임을 입력해주세요.");
        return true;
      }
    };

    return {
      username,
      password,
      name,
      nickname,
      onSubmit,
    };
  },
};
</script>

<style></style>
