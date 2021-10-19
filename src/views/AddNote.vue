<template>
  <div class="page container">
    <div class="info">
      <router-link :to="{ name: 'Home' }">
        <div class="info-title">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 19L8.5 12L15.5 5" />
          </svg>
          <p>Your notes</p>
        </div>
      </router-link>
      <button
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
      </button>
    </div>
    <div class="note-taking-area">
      <div class="title">
        <input type="text" placeholder="title" v-model="title" />
      </div>
      <div class="note-typed">
        <QuillEditor
          :toolbar="toolbar"
          v-model:content="content"
          :modules="modules"
          placeholder="Type your note here"
        />
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import { collection, addDoc } from "firebase/firestore";
import slugify from "slugify";
import { QuillEditor } from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter";
import ImageCompress from "quill-image-compress";
import MagicUrl from "quill-magic-url";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import toPlaintext from "quill-delta-to-plaintext";

export default {
  name: "AddNote",
  components: {
    QuillEditor,
  },
  data() {
    return {
      title: null,
      text: null,
      content: null,
      slug: null,
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ list: "bullet" }, { list: "ordered" }],
        ["link", "image"],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ],
      modules: [
        {
          name: "blotFormatter",
          module: BlotFormatter,
        },
        {
          name: "imageCompress",
          module: ImageCompress,
        },
        {
          name: "magicUrl",
          module: MagicUrl,
        },
      ],
      saveStatus: "Save",
      saving: false,
      saved: false,
    };
  },
  methods: {
    async addNote() {
      this.text = toPlaintext(this.content).slice(0, 200);
      this.content = JSON.stringify(this.content);
      this.saving = true;
      this.saveStatus = "Saving";
      // create a slug
      this.slug = slugify(this.title, {
        replacement: "-",
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true,
      });
      const docRef = await addDoc(collection(db, "notes"), {
        title: this.title,
        text: this.text,
        content: JSON.parse(this.content),
        slug: this.slug,
        lastUpdated: new Date(),
      });
      setTimeout(() => {
        this.saving = false;
        this.saved = true;
        this.saveStatus = "Saved";
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 500);
      }, 500);
    },
  },
};
</script>

<style lang="scss"></style>
