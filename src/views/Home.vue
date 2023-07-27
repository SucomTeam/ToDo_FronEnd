<template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      v-model="todo"
      clearable
      hide-details="auto"
      label="Last name"
      @keyup.enter="saveToDo()"
    ></v-text-field>
  </v-responsive>
</template>

<script>
  import HelloWorld from '@/components/HelloWorld.vue'
  import axios from 'axios'

  export default {
    name : "Home",
    data: () => ({
      todo: '',
    }),
    methods: {
      saveToDo() {
        axios.post("/api/v1/todo/save", {
          title : this.todo,
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
        console.log(this.todo);
      }
    },
  }
</script>
