<template>
    <button @click="removeItem">Delete</button>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deletePost } from "@/api/api";

export default {
  name: "DeleteItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('main', ['posts', 'error', 'loading', 'showDataList'])
  },
  actions: {
    ...mapActions('main', ['fetchPosts', 'setShowDataList','handleError'])
  },
  methods: {
    async removeItem() {
      if (!this.post || !this.post.id) {
        console.error("Post ID is undefined");
        return;
      }
      try {
        await deletePost(this.post.id);
        this.$store.dispatch('main/fetchPosts', this.posts.filter(post => post.id !== this.post.id));
        console.log(this.post.id, 'Post ID deleted')

      } catch (error) {
        console.error("Error deleting post:", error);
        this.$store.dispatch('main/handleError', true);
      }
    }
  }
}
</script>
