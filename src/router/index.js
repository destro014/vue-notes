import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddNote from "../views/AddNote.vue";
import Note from "../views/Note.vue";
import Login from "../auth/Login.vue";
import firebase from "firebase/app";
import "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
      title: "Destro's Notes",
    },
  },
  {
    path: "/addnote",
    name: "AddNote",
    component: AddNote,
    meta: {
      requiresAuth: true,
      title: "Add Note : Destro' s Note",
    },
  },

  {
    path: "/note/:note_slug",
    name: "Note",
    component: Note,
    meta: {
      requiresAuth: true,
      title: "Destro's Notes",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login : Destro' s Note",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({ name: "Login" });
      }
    });
  } else {
    next();
  }
});
export default router;
