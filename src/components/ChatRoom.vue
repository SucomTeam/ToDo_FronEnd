<template>
  <div v-if="room.length !== 0">
    <v-card width="400" @click="joinRoom">
      <template v-slot:title> {{ room.roomId }} </template>

      <template v-slot:subtitle> {{ room.title }} </template>

      <template v-slot:text> {{ room.owner }} </template>
    </v-card>
  </div>
</template>

<script>
export default {
  emit: ["join"],
  props: {
    room: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const joinRoom = () => {
      emit("join");
    };

    return {
      joinRoom,
    };
  },
};
</script>

<style scoped></style>
