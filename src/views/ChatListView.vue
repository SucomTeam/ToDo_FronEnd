<template>
  <div class="d-flex align-center flex-column">
    <h2>채팅</h2>
    <div class="d-flex align-center flex-column">
      <div v-for="chatMsg in chatMsgList" :key="chatMsg.room_id">
        <v-card
          width="400"
          :title="chatMsg.mem_no"
          :text="chatMsg.msg"
        ></v-card>
      </div>
    </div>
    <input
      v-model="chatMsgInput"
      placeholder="메시지를 입력해주세요."
      @keyup.enter="chatMsgPush"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import { ref } from "vue";
import ChatRoom from "../components/ChatRoom.vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";

export default {
  components: { ChatRoom },
  setup() {
    const chatMsgInput = ref("");

    const route = useRoute();

    const roomId = route.params.roomId;

    const userStore = useUserStore();
    const user = userStore.getUser();

    const chatMsgList = ref([
      {
        mem_no: 1,
        msg: "메시지1",
      },
      {
        mem_no: 2,
        msg: "메시지2",
      },
      {
        mem_no: 3,
        msg: "메시지3",
      },
    ]);

    const chatMsgPush = () => {
      console.log(chatMsgInput.value);
    };

    const socket = io("http://localhost:8005/chat", {
      path: "/socket.io",
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.emit("join", { roomId: roomId });

    onUnmounted(() => {
      socket.emit("disconnection");
    });

    return {
      chatMsgInput,
      chatMsgList,
      chatMsgPush,
    };
  },
};
</script>

<style scoped></style>
