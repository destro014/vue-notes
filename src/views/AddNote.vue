<template>
  <div class="add-note container">
    <div class="info">
      <router-link :to="{ name: 'Home' }">
        <div class="info-title">
          <img src="@/assets/img/back.png" alt="" />
          <h2>Your notes</h2>
        </div>
      </router-link>
      <div
        class="save-btn-disabled"
        @click="addNote"
        :class="{ 'save-btn': title }"
      >
        <div class="circle" v-if="saving"></div>
        <div class="check" v-if="saved"></div>
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
