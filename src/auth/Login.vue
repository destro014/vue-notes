<template>
  <div class="login container">
    <h1>Login</h1>
    <form action="" @submit.prevent="login">
      <div class="input-group">
        <input
          type="text"
          id="username"
          v-model="username"
          @input="checkInput"
        />
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11.5789" cy="7.27803" r="4.77803" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.00002 18.7014C3.99873 18.3655 4.07385 18.0337 4.2197 17.7311C4.67736 16.8158 5.96798 16.3307 7.03892 16.111C7.81128 15.9462 8.59431 15.836 9.38217 15.7815C10.8408 15.6533 12.3079 15.6533 13.7666 15.7815C14.5544 15.8367 15.3374 15.9468 16.1099 16.111C17.1808 16.3307 18.4714 16.77 18.9291 17.7311C19.2224 18.3479 19.2224 19.064 18.9291 19.6808C18.4714 20.6419 17.1808 21.0812 16.1099 21.2918C15.3384 21.4634 14.5551 21.5766 13.7666 21.6304C12.5794 21.7311 11.3866 21.7494 10.1968 21.6854C9.92221 21.6854 9.65677 21.6854 9.38217 21.6304C8.59663 21.5773 7.81632 21.4641 7.04807 21.2918C5.96798 21.0812 4.68652 20.6419 4.2197 19.6808C4.0746 19.3747 3.99955 19.0401 4.00002 18.7014Z"
          />
        </svg>
        <label for="username">Username</label>
      </div>

      <div class="input-group">
        <input
          :type="passwordType"
          id="password"
          v-model="password"
          @input="checkInput"
        />
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.4235 9.4478V7.3008C16.4235 4.7878 14.3855 2.7498 11.8725 2.7498C9.35949 2.7388 7.31349 4.7668 7.30249 7.2808V7.3008V9.4478"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.6832 21.2496H8.04224C5.94824 21.2496 4.25024 19.5526 4.25024 17.4576V13.1686C4.25024 11.0736 5.94824 9.37659 8.04224 9.37659H15.6832C17.7772 9.37659 19.4752 11.0736 19.4752 13.1686V17.4576C19.4752 19.5526 17.7772 21.2496 15.6832 21.2496Z"
          />
          <path d="M11.8629 14.2027V16.4237" />
        </svg>
        <svg
          class="show"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          v-if="!showPassword"
          @click="viewPassword"
        >
          <path
            d="M15.1614 12.0531C15.1614 13.7991 13.7454 15.2141 11.9994 15.2141C10.2534 15.2141 8.83838 13.7991 8.83838 12.0531C8.83838 10.3061 10.2534 8.89111 11.9994 8.89111C13.7454 8.89111 15.1614 10.3061 15.1614 12.0531Z"
          />
          <path
            d="M11.998 19.3549C15.806 19.3549 19.289 16.6169 21.25 12.0529C19.289 7.48892 15.806 4.75092 11.998 4.75092H12.002C8.194 4.75092 4.711 7.48892 2.75 12.0529C4.711 16.6169 8.194 19.3549 12.002 19.3549H11.998Z"
          />
        </svg>
        <svg
          class="hide"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          v-else
          @click="viewPassword"
        >
          <path
            d="M9.76057 14.3668C9.18557 13.7928 8.83557 13.0128 8.83557 12.1378C8.83557 10.3848 10.2476 8.9718 11.9996 8.9718C12.8666 8.9718 13.6646 9.3228 14.2296 9.8968"
          />
          <path
            d="M15.1047 12.6989C14.8727 13.9889 13.8567 15.0069 12.5677 15.2409"
          />
          <path
            d="M6.65451 17.4723C5.06751 16.2263 3.72351 14.4063 2.74951 12.1373C3.73351 9.85829 5.08651 8.02829 6.68351 6.77229C8.27051 5.51629 10.1015 4.83429 11.9995 4.83429C13.9085 4.83429 15.7385 5.52629 17.3355 6.79129"
          />
          <path
            d="M19.4475 8.99078C20.1355 9.90478 20.7405 10.9598 21.2495 12.1368C19.2825 16.6938 15.8065 19.4388 11.9995 19.4388C11.1365 19.4388 10.2855 19.2988 9.46753 19.0258"
          />
          <path d="M19.8868 4.24957L4.11279 20.0236" />
        </svg>

        <label for="password">Password</label>
      </div>
      <p class="feedback" v-if="feedback">{{ feedback }}</p>
      <button
        class="submit-btn-disabled"
        type="submit"
        :class="{ 'submit-btn': filled }"
      >
        <div class="loader" v-if="loggingIn"></div>
        {{ loginText }}
      </button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/init";

export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      filled: false,
      feedback: null,
      username: null,
      password: null,
      passwordType: "password",
      loggingIn: false,
      loginText: "Login",
      user: false,
    };
  },

  methods: {
    login() {
      this.feedback = null;
      this.loggingIn = true;
      this.loginText = "Logging In";
      let ref = db.collection("users").doc(this.username);
      ref.get().then(doc => {
        if (doc.exists) {
          firebase
            .auth()
            .signInWithEmailAndPassword(doc.data().email, this.password)
            .then(() => {
              setTimeout(() => {
                this.$router.push({ name: "Home" });
              }, 500);
            })
            .catch(err => {
              this.feedback = err.message;
              this.loggingIn = false;
              this.loginText = "Login";
            });
        } else {
          this.loggingIn = false;
          this.loginText = "Login";
          this.feedback = "Username doesn't exists";
        }
      });
    },
    checkInput() {
      if (this.username && this.password) {
        this.filled = true;
      } else {
        this.filled = false;
      }
    },
    viewPassword() {
      this.showPassword = !this.showPassword;
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else this.user = null;
    });
  },
  watch: {
    user: function() {
      console.log("hellop");
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
        } else this.user = null;
      });
    },
  },
};
</script>

<style></style>
