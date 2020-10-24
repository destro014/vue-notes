import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddNote from "../views/AddNote.vue";
import Note from "../views/Note.vue";
import Login from "../auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/addnote",
    name: "AddNote",
    component: AddNote
  },

  {
    path: "/note/:note_slug",
    name: "Note",
    component: Note
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
