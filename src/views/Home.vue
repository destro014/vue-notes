<template>
  <div class="page container">
    <div class="info">
      <div class="info-title">
        <p>Your notes</p>
      </div>
      <div class="new-btn">
        <router-link :to="{ name: 'AddNote' }">
          <svg viewBox="0 0 24 24">
            <path
              d="M11.4922 2.789H7.75324C4.67824 2.789 2.75024 4.966 2.75024 8.048V16.362C2.75024 19.444 4.66924 21.621 7.75324 21.621H16.5772C19.6622 21.621 21.5812 19.444 21.5812 16.362V12.334"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.82763 10.9209L16.3006 3.44793C17.2316 2.51793 18.7406 2.51793 19.6716 3.44793L20.8886 4.66493C21.8196 5.59593 21.8196 7.10593 20.8886 8.03593L13.3796 15.5449C12.9726 15.9519 12.4206 16.1809 11.8446 16.1809H8.09863L8.19263 12.4009C8.20663 11.8449 8.43363 11.3149 8.82763 10.9209Z"
            />
            <path d="M15.165 4.60254L19.731 9.16854" />
          </svg>
        </router-link>
      </div>
    </div>
    <div class="notes" v-if="notes.length > 0">
      <NoteCard
        v-for="note in filteredNotes.slice().reverse()"
        :key="note.id"
        :note="note"
      />
    </div>
    <div class="skeleton" v-else>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
    </div>

    <div v-if="searchTerm">
      <div class="no-search-result" v-if="filteredNotes.length == 0">
        <h1>No result found</h1>
      </div>
    </div>
    <div v-else>
      <div class="empty-state" v-if="noNotes">
        <h1>No notes available</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import db from "@/firebase/init";
import NoteCard from "@/components/NoteCard.vue";
export default {
  name: "Home",
  props: ["searchTerm"],
  components: {
    NoteCard,
  },
  data() {
    return {
      notes: [],
      noNotes: false,
    };
  },
  computed: {
    filteredNotes() {
      return this.notes.filter(note => {
        return (
          note.title.toLowerCase().match(this.searchTerm) ||
          note.content.toLowerCase().match(this.searchTerm)
        );
      });
    },
  },
  async mounted() {
    const q = query(collection(db, "notes"), orderBy("lastUpdated"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      let note = doc.data();
      note.id = doc.id;
      this.notes.push(note);
    });
    if (querySnapshot.size == 0) {
      this.noNotes == true;
    }
  },
};
</script>
