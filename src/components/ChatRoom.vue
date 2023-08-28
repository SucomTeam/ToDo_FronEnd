<template>
  <div v-if="room.length !== 0">
    <v-card width="400" @click="joinRoom(room.room_id)">
      <template v-slot:title> {{ room.room_id }} </template>

      <template v-slot:subtitle> {{ room.room_id }} </template>

      <template v-slot:text> {{ room.owner_no }} </template>
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
    const joinRoom = (roomId) => {
      emit("join", roomId);
    };

    return {
      joinRoom,
    };
  },
};
</script>

<style scoped></style>
