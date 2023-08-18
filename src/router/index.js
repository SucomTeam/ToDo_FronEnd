// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/signin",
    name: "SignInView",
    component: () => import("@/views/SignInView.vue"),
  },
  {
    path: "/signup",
    name: "SignUnView",
    component: () => import("@/views/SignUpView.vue"),
  },
  {
    path: "/chatroom",
    name: "ChatRoomView",
    component: () => import("@/views/ChatRoomView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
