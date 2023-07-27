<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-text-field
      v-model="todo"
      clearable
      hide-details="auto"
      label="Last name"
      @keyup.enter="saveToDo()"
    ></v-text-field>
  </v-responsive>
  <!-- <v-list lines="two">
    <v-list-item
      v-for="item in reviewList"
      :key="item.id"
      :title="item.title"
      @click="deleteItem(item, idx)"
    ></v-list-item>
  </v-list> -->

  <v-card class="mx-auto" max-width="300">
    <v-list disabled>
      <v-list-subheader>REPORTS</v-list-subheader>

      <v-list-item v-for="item in reviewList" :key="item.id">
        <v-list-item-title>{{ item.title }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const reviewList = ref([]);
    const todo = ref("");
    axios
      .get("/api/v1/todo/get", {})
      .then((res) => {
        console.log(res.data);
        reviewList.value = res.data;
        console.log("reviewList.value", reviewList.value);
      })
      .catch((err) => {
        console.log(err);
      });

    return {
      todo,
      reviewList,
      saveToDo() {
        axios
          .post("/api/v1/todo/save", {
            title: this.todo,
          })
          .then((res) => {
            console.log(res);
            this.reviewList.push(res.data);
            this.todo = "";
          })
          .catch((err) => {
            console.log(err);
          });
      },
      deleteItem(item, idx) {
        console.log(item.id, idx);
        axios
          .delete("/api/v1/todo/delete/" + item.id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
  },
};
</script>
