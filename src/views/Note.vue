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
      <div class="cta-btn">
        <div class="delete-btn" @click="deletePopup">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.325 9.4682C19.325 9.4682 18.782 16.2032 18.467 19.0402C18.317 20.3952 17.48 21.1892 16.109 21.2142C13.5 21.2612 10.888 21.2642 8.28003 21.2092C6.96103 21.1822 6.13803 20.3782 5.99103 19.0472C5.67403 16.1852 5.13403 9.4682 5.13403 9.4682"
            />
            <path d="M20.7082 6.23969H3.75024" />
            <path
              d="M17.4406 6.23967C16.6556 6.23967 15.9796 5.68467 15.8256 4.91567L15.5826 3.69967C15.4326 3.13867 14.9246 2.75067 14.3456 2.75067H10.1126C9.53358 2.75067 9.02558 3.13867 8.87558 3.69967L8.63258 4.91567C8.47858 5.68467 7.80258 6.23967 7.01758 6.23967"
            />
          </svg>
        </div>

        <button
          class="save-btn-disabled"
          :class="{ 'save-btn': noteEdited }"
          @click="update(note)"
        >
          <div class="circle" v-if="updating"></div>
          <div class="check" v-if="updated">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.3344 2.75018H7.66537C4.64437 2.75018 2.75037 4.88918 2.75037 7.91618V16.0842C2.75037 19.1112 4.63537 21.2502 7.66537 21.2502H16.3334C19.3644 21.2502 21.2504 19.1112 21.2504 16.0842V7.91618C21.2504 4.88918 19.3644 2.75018 16.3344 2.75018Z"
              />
              <path d="M8.43982 12.0002L10.8138 14.3732L15.5598 9.6272" />
            </svg>
          </div>
          {{ updateStatus }}
        </button>
      </div>
    </div>
    <div class="note-taking-area" v-if="note">
      <div class="title">
        <input
          type="text"
          placeholder="title"
          v-model="note.title"
          @input="edited()"
        />
      </div>
      <div class="note-typed">
        <!-- <textarea
          name="note"
          placeholder="type your note here"
          v-model="note.content"
          @input="edited"
        ></textarea> -->
        <QuillEditor
          :toolbar="toolbar"
          @update:content="editorUpdated"
          v-model:content="note.content"
          :modules="modules"
          placeholder="Type your note here"
        />
      </div>
    </div>

    <div class="note-skeleton" v-else>
      <div class="title-skeleton"></div>
      <div class="note-taking-skeleton"></div>
    </div>
    <div class="delete-popup" v-if="deleteClicked">
      <div class="delete-dialog">
        <div class="bar">
          <h3>Confirm delete?</h3>
          <p class="cross" @click="deletePopup">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.3955 9.59491L9.60352 14.3869" />
              <path d="M14.397 14.3898L9.60095 9.59277" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.3345 2.75018H7.66549C4.64449 2.75018 2.75049 4.88918 2.75049 7.91618V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91618C21.2505 4.88918 19.3645 2.75018 16.3345 2.75018Z"
              />
            </svg>
          </p>
        </div>
        <div class="alert">
          <p class="danger">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9999 2.75018C17.1089 2.75018 21.2499 6.89218 21.2499 12.0002C21.2499 17.1082 17.1089 21.2502 11.9999 21.2502C6.89188 21.2502 2.74988 17.1082 2.74988 12.0002C2.74988 6.89218 6.89188 2.75018 11.9999 2.75018Z"
              />
              <path d="M11.995 8.20428V12.6233" />
              <path d="M11.995 15.7961H12.005" />
            </svg>

            Note : If you delete this, it will no longer be available
          </p>
        </div>
        <p class="question">Are you sure want to delete?</p>
        <div class="popup-btn">
          <div class="cancel-btn btn" @click="deletePopup">Cancel</div>
          <div class="delete-approve-btn btn" @click="deleteNote(note.id)">
            {{ deleteBtnLabel }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import { QuillEditor } from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter";
import ImageCompress from "quill-image-compress";
import MagicUrl from "quill-magic-url";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import toPlaintext from "quill-delta-to-plaintext";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import slugify from "slugify";
export default {
  name: "Note",
  components: {
    QuillEditor,
  },
  data() {
    return {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
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
      updateStatus: "Update",
      updating: false,
      updated: false,
      note: null,
      deleteClicked: null,
      title: null,
      text: null,
      content: null,
      noteEdited: null,
      deleteBtnLabel: "delete",
    };
  },
  methods: {
    edited() {
      if (this.title != this.note.title) {
        this.noteEdited = true;
      } else {
        this.noteEdited = false;
      }
    },
    editorUpdated() {
      this.noteEdited = true;
    },
    editorReady(e) {
      e.setContents(this.note.content);
    },
    async update() {
      if (this.note.title) {
        this.text = toPlaintext(this.note.content).slice(0, 200);
        this.note.content = JSON.stringify(this.note.content);
        this.updating = true;
        this.updateStatus = "updating";
        //create a slug
        this.note.slug = slugify(this.note.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        //creating date and time
        const ref = doc(db, "notes", this.note.id);
        await updateDoc(ref, {
          title: this.note.title,
          text: this.text,
          content: JSON.parse(this.note.content),
          slug: this.note.slug,
          lastUpdated: new Date(),
        });
        setTimeout(() => {
          this.updating = false;
          this.updated = true;
          this.updateStatus = "Updated";
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 500);
        }, 500);
      }
    },
    deletePopup() {
      this.deleteClicked = !this.deleteClicked;
    },
    async deleteNote(id) {
      this.deleteBtnLabel = "Deleting";
      await deleteDoc(doc(db, "notes", id));
      this.deleteBtnLabel = "Deleted";
      setTimeout(() => {
        this.$router.push({ name: "Home" });
      }, 500);
    },
  },
  async created() {
    const q = query(
      collection(db, "notes"),
      where("slug", "==", this.$route.params.note_slug)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      this.note = doc.data();
      this.note.id = doc.id;
      this.title = this.note.title;
      this.content = this.note.content;
    });
  },
};
</script>

<style lang="scss"></style>
