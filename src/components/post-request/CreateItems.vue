<template>
  <div class="header">
    <form @submit.prevent="handleCreatePost" class="form">
      <input type="text" placeholder="Enter a title" v-model="titleValue" />
      <input type="text" placeholder="Enter a body" v-model="bodyValue" />
      <button type="submit">Add Post</button>
    </form>
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
    ...mapGetters("main", ["posts", "createShowItem", "error"])
  },
  methods: {
      ...mapActions("main", ["fetchPosts"]),

    async handleCreatePost() {
      const newId = this.posts.length ? Math.max(...this.posts.map(item => item.id)) + 1 : 101

      const newPost = {
        id: newId,
        title: this.titleValue,
        body: this.bodyValue,
      };

      console.log(newPost, 'newPost')

      try {
        const postItem = await createPost(newPost);

        if (postItem) {
          const updatedPosts = [...this.posts, newPost];

          this.$store.dispatch("main/fetchPosts", updatedPosts);

          this.titleValue = "";
          this.bodyValue = "";
        }
        this.$store.dispatch("main/setShowDataList", {
          key: "createShowItem",
          value: !this.createShowItem,
        });

      } catch (error) {
        this.$store.dispatch("main/handleError", error);
        console.error("Failed to create post:", error);
      }
    }
  }
}
</script>
