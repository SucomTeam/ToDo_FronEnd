<template>
  <div class="d-flex align-center flex-column">
    <h2>채팅방</h2>

    <v-btn @click="createChatRoom">채팅방 생성</v-btn>

    <chat-room
      v-for="room in roomList"
      :key="room.roomId"
      :room="room"
      @join="joinRoom"
    >
    </chat-room>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import { ref } from "vue";
import ChatRoom from "../components/ChatRoom.vue";

export default {
  components: { ChatRoom },
  setup() {
    const roomList = ref([]);

    const chatRoomList = () => {
      axios
        .get(`http://localhost:8005/room`)
        .then((res) => {
          roomList.value = res.data.roomList;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    chatRoomList();

    const createChatRoom = () => {
      axios
        .post("http://localhost:8005/room", {
          ownerId: socket.id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      chatRoomList();
    };

    const socket = io("http://localhost:8005/room", {
      path: "/socket.io",
      transports: ["websocket"],
      withCredentials: true,
    });

    const joinRoom = () => {
      socket.emit(
        "join",
        socket.id + "_" + new URL(location).pathname.split("/").at(-1)
      );
    };

    return {
      roomList,
      chatRoomList,
      createChatRoom,
      joinRoom,
    };
  },
};
</script>

<style scoped></style>
