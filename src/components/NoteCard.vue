<template>
  <div class="note">
    <router-link
      :to="{ name: 'Note', params: { note_slug: note.slug } }"
      class="note-card"
    >
      <div class="title">
        {{ note.title }}
      </div>
      <div class="content">
        <p>{{ note.text }}</p>
      </div>
      <div class="last-edited">
        {{ this.timeAgo(this.note.lastUpdated) }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NoteCard",
  props: ["note"],
  methods: {
    snippet(val) {
      if (!val || typeof val != "string") return "";
      val = val.slice(0, 56);
      return val;
    },

    getFormattedDate(date, prefomattedDate = false, hideYear = false) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();

      let time;

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (hours > 12) {
        time = `${hours - 12}:${minutes} PM`;
      } else if (hours === 12) {
        time = `${hours}:${minutes} PM`;
      } else if (hours === 0) {
        time = `12:${minutes} AM`;
      } else {
        time = `${hours}:${minutes} AM`;
      }
      if (prefomattedDate) {
        return `${prefomattedDate} at ${time}`;
      }
      if (hideYear) {
        return `${day} ${month} at ${time}`;
      }
      return `${day} ${month} ${year} at ${time}`;
    },
    timeAgo(dateObj) {
      if (!dateObj) {
        return null;
      }
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let date;
      if (dateObj instanceof Date) {
        date = dateObj;
      } else {
        date = dateObj.toDate();
      }
      const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
      const today = new Date();
      const yesterday = new Date(today - DAY_IN_MS);
      const seconds = Math.round((today - date) / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);
      const day = date.getDay();
      const dayDiff = Math.round(
        (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
      );
      const isWeek = dayDiff < 6 && dayDiff > 1;
      const isToday = today.toDateString() === date.toDateString();
      const isYesterday = yesterday.toDateString() === date.toDateString();
      const isThisYear = today.getFullYear() === date.getFullYear();

      if (seconds < 5) {
        return "now";
      } else if (seconds < 60) {
        return `${seconds} seconds ago`;
      } else if (seconds < 90) {
        return "about a minute ago";
      } else if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 12) {
        return `${hours} hours ago`;
      } else if (isToday) {
        return this.getFormattedDate(date, "Today"); // Today at 10:20
      } else if (isYesterday) {
        return this.getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
      } else if (isWeek) {
        return this.getFormattedDate(date, dayNames[day]); // Fri at 10:20
      } else if (isThisYear) {
        return this.getFormattedDate(date, false, true); // 10. January at 10:20
      }
      return this.getFormattedDate(date); // 10. January 2017. at 10:20
    },
  },
};
</script>

<style></style>
