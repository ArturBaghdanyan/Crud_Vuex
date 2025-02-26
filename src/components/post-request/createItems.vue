<template>
  <div class="header">
    <form @submit.prevent="handleCreatePost" class="form">
      <input type="text" placeholder="Enter a title" v-model="titleValue" />
      <input type="text" placeholder="Enter a body" v-model="bodyValue" />
      <button type="submit">Add Post</button>
    </form>
    <p v-if="error">Failed to create post.</p>
  </div>
</template>


<script>
import '@/assets/css/repeated.css';

import { mapActions, mapGetters } from "vuex";
import { createPost } from "@/api/api.js";

export default {
  name: "CreatePost",
  data() {
    return {
      titleValue: "",
      bodyValue: "",
    };
  },
  computed: {
    ...mapGetters("main", ["posts", 'error', "createShowItem"])
  },
  methods: {
      ...mapActions("main", ["createItem"]),

    handleCreatePost() {

      const newPost = {
        title: this.titleValue,
        body: this.bodyValue
      };

      createPost(newPost).then(() => {
        this.$store.dispatch("main/setShowDataList", {
          key: "createShowItem",
          value: !this.createShowItem
        });
        this.titleValue = "";
        this.bodyValue = "";

      }).catch(error => {
        this.$store.dispatch("main/handleError", error)
          console.error("Failed to create post:", error);
        })
    }
  }
}
</script>
