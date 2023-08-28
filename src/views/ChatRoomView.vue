<template>
  <div class="d-flex align-center flex-column">
    <h2>채팅방</h2>

    <v-btn @click="createChatRoom">채팅방 생성</v-btn>

    <chat-room
      v-for="room in roomList"
      :key="room.room_id"
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
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export default {
  components: { ChatRoom },
  setup() {
    const userStore = useUserStore();
    const user = userStore.getUser();

    const roomList = ref([]);

    const router = useRouter();

    const chatRoomList = () => {
      axios
        .get(`http://localhost:8005/room`)
        .then((res) => {
          console.log(res.data);
          roomList.value = res.data.roomList;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    chatRoomList();

    const createChatRoom = () => {
      console.log(user.id);
      axios
        .post("http://localhost:8005/room", {
          ownerId: user.id,
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

    const joinRoom = (roomId) => {
      router.push(`/chatList/${roomId}`);
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
