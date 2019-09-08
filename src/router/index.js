import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddNote from '@/components/AddNote'
import Note from '@/components/Note'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/addnote',
      name: 'AddNote',
      component: AddNote
    },
    // {
    //   path: '/',
    //   name: 'UpdateNotes',
    //   component: UpdateNotes
    // },
    {
      path: '/note/:note_slug',
      name: 'Note',
      component: Note
    }
  ]
})
