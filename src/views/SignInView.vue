<template>
  <v-card class="mx-auto px-6 py-8" max-width="344" title="로그인">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-text-field
        v-model="username"
        :rules="[username_rule]"
        class="mb-2"
        clearable
        label="아이디"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[password_rule]"
        clearable
        label="비밀번호"
      ></v-text-field>

      <br />

      <v-btn
        :disabled="!form"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        로그인
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    form: false,
    username: "",
    password: "",
  }),

  methods: {
    onSubmit() {
      if (!this.form) return;

      const loginData = {
        username: this.username,
        password: this.password,
      };

      // API 요청 구간
      axios
        .post("", loginData)
        .then((res) => {
          conosle.log(res);
        })
        .catch((err) => {
          conosle.log(err);
        });
    },
    username_rule(v) {
      return !!v || "아이디를 입력하세요.";
    },
    password_rule(v) {
      return !!v || "비밀번호를 입력하세요.";
    },
  },
};
</script>

<style></style>
