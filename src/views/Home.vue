<template>
  <div class="index container">
    <div class="info">
      <div class="info-title">
        <h2>Your notes</h2>
      </div>
      <div class="new-btn">
        <router-link :to="{ name: 'AddNote' }">
          + Add new
        </router-link>
      </div>
    </div>
    <div class="notes">
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
            <!-- <p>{{ note.content.slice(0, 50) }}</p> -->
            <p>{{ snippet(note.content) }}</p>
          </div>
          <div class="last-edited">
            <div class="date">
              <img src="@/assets/img/calendar.png" alt="" />
              <span
                >{{ note.moment[1] }} {{ note.moment[2] }},
                {{ note.moment[0] }}</span
              >
            </div>
            <div class="time">
              <img src="@/assets/img/clock.png" alt="" />
              <span
                >{{ note.moment[3] }} : {{ note.moment[4] }}
                {{ note.moment[5] }}</span
              >
            </div>
          </div>
        </router-link>
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
      notes: []
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
  created() {
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
      val = val.slice(0, 50);
      return val;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
