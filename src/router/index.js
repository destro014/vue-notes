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
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  //check if router requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    //check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      // no user signed
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
export default router;
