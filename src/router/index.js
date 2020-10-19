import { createRouter, createWebHistory } from "vue-router";
import Index from "@/components/Index";
import AddNote from "@/components/AddNote";
import Note from "@/components/Note";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/addnote",
    name: "AddNote",
    component: AddNote,
  },
  // {
  //   path: '/',
  //   name: 'UpdateNotes',
  //   component: UpdateNotes
  // },
  {
    path: "/note/:note_slug",
    name: "Note",
    component: Note,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
