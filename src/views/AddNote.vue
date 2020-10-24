<template>
  <div class="add-note container">
    <div class="info">
      <router-link :to="{ name: 'Home' }">
        <div class="info-title">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 19L8.5 12L15.5 5" />
          </svg>
          <p>Your notes</p>
        </div>
      </router-link>
      <div
        class="save-btn-disabled"
        @click="addNote"
        :class="{ 'save-btn': title }"
      >
        <div class="circle" v-if="saving"></div>
        <div class="check" v-if="saved">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.3344 2.75018H7.66537C4.64437 2.75018 2.75037 4.88918 2.75037 7.91618V16.0842C2.75037 19.1112 4.63537 21.2502 7.66537 21.2502H16.3334C19.3644 21.2502 21.2504 19.1112 21.2504 16.0842V7.91618C21.2504 4.88918 19.3644 2.75018 16.3344 2.75018Z"
            />
            <path d="M8.43982 12.0002L10.8138 14.3732L15.5598 9.6272" />
          </svg>
        </div>
        {{ saveStatus }}
      </div>
    </div>
    <div class="note-taking-area">
      <div class="title">
        <input type="text" placeholder="title" v-model="title" />
      </div>
      <div class="note-typed">
        <textarea
          name="note"
          placeholder="type your note here"
          v-model="content"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddNote",
  data() {
    return {
      title: null,
      content: null,
      moment: [],
      slug: null,
      monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      meridian: null,
      saveStatus: "Save",
      saving: false,
      saved: false
    };
  },
  methods: {
    addNote() {
      if (this.title || this.content) {
        this.saving = true;
        this.saveStatus = "Saving";
        //create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        //creating date and time
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth();
        this.day = new Date().getDate();
        this.hour = new Date().getHours();
        this.minute = new Date().getMinutes();
        if (this.hour < 10) {
          this.hour = "0" + this.hour;
        }
        if (this.minute < 10) {
          this.minute = "0" + this.minute;
        }
        if (this.hour < 12) {
          this.meridian = "A.M";
          if (this.hour == 0) {
            this.hour = 12;
          }
        } else {
          this.hour = this.hour % 12;
          this.meridian = "P.M";
        }

        db.collection("notes")
          .add({
            title: this.title,
            content: this.content,
            slug: this.slug,
            moment: [
              this.year,
              this.monthNames[this.month],
              this.day,
              this.hour,
              this.minute,
              this.meridian
            ],
            time: new Date().getTime() / 1000
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          this.saving = false;
          this.saved = true;
          this.saveStatus = "Saved";
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 500);
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss"></style>
