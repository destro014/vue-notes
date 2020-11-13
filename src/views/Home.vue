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
    <div class="notes" v-if="notes">
      <div
        class="note"
        v-for="note in filteredNotes.slice().reverse()"
        :key="note.id"
      >
        <router-link
          :to="{ name: 'Note', params: { note_slug: note.slug } }"
          class="note-card"
        >
          <div class="title">
            {{ note.title }}
          </div>
          <div class="content">
            <p>{{ snippet(note.content) }}</p>
          </div>
          <div class="last-edited">
            <div class="date">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.09253 9.40427H20.9165" />
                <path
                  d="M16.442 13.3097H16.4512"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0047 13.3097H12.014"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.55793 13.3097H7.5672"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.442 17.1962H16.4512"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0047 17.1962H12.014"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.55793 17.1962H7.5672"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.0438 2V5.29078"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.9654 2V5.29078"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.2383 3.57922H7.77096C4.83427 3.57922 3 5.21516 3 8.22225V17.2719C3 20.3263 4.83427 22 7.77096 22H16.229C19.175 22 21 20.3546 21 17.3475V8.22225C21.0092 5.21516 19.1842 3.57922 16.2383 3.57922Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span
                >{{ note.moment[1] }} {{ note.moment[2] }},
                {{ note.moment[0] }}</span
              >
            </div>
            <div class="time">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M21.2498 12.0005C21.2498 17.1095 17.1088 21.2505 11.9998 21.2505C6.89076 21.2505 2.74976 17.1095 2.74976 12.0005C2.74976 6.89149 6.89076 2.75049 11.9998 2.75049C17.1088 2.75049 21.2498 6.89149 21.2498 12.0005Z"
                />
                <path d="M15.4314 14.9429L11.6614 12.6939V7.84686" />
              </svg>

              <span
                >{{ note.moment[3] }} : {{ note.moment[4] }}
                {{ note.moment[5] }}</span
              >
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="skeleton" v-else>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
      <div class="skeleton-card"></div>
    </div>

    <div v-if="searchTerm">
      <div
        class="no-search-result"
        v-if="Array.isArray(filteredNotes) && filteredNotes.length == 0"
      >
        <h1>No result found</h1>
      </div>
    </div>
    <div v-else>
      <div class="empty-state" v-if="Array.isArray(notes) && notes.length == 0">
        <h1>No notes available</h1>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Home",
  props: ["searchTerm"],
  data() {
    return {
      notes: null
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
    }
  },
  mounted() {
    db.collection("notes")
      .orderBy("time")
      .onSnapshot(snapshot => {
        this.notes = [];
        snapshot.forEach(doc => {
          let note = doc.data();
          note.id = doc.id;
          this.notes.push(note);
        });
      });
  },
  methods: {
    snippet(val) {
      if (!val || typeof val != "string") return "";
      val = val.slice(0, 56);
      return val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
