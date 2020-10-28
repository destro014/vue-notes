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
      requiresAuth: true
    }
  },
  {
    path: "/addnote",
    name: "AddNote",
    component: AddNote,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/note/:note_slug",
    name: "Note",
    component: Note,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          next({ name: "Home" });
        } else {
          // no user signed
          next();
        }
      });
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
