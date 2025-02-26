<template>
  <div class="header">
    <form @submit.prevent="updatePostData" class="form">
      <input type="text" placeholder="Enter a title" v-model="updatedBody" />
      <input type="text" placeholder="Enter a body" v-model="updatedTitle" />
      <button>Save</button>
      <button @click="cancelUpdate">Cancel</button>
    </form>
  </div>
</template>

<script>
import '../../assets/css/repeated.css';
import {mapActions, mapGetters, mapState} from "vuex";
import {updatePost} from "@/api/api.js";

export default {
  name: "UpdateItems",
  data() {
    return {
      updatedTitle: '',
      updatedBody: '',
    };
  },
  computed: {
    ...mapGetters("main", ['error', 'selectedPost', 'updateVisible']),
    ...mapState("main", ["posts"]),
  },

  methods: {
    ...mapActions("main", ["fetchPosts", "setSelectedPost"]),

    async updatePostData() {

      const updatedPost = {
        id: this.selectedPost.id,
        title: this.updatedTitle,
        body: this.updatedBody,
      }

      try {
        const update = await updatePost(updatedPost);

        if(update) {
          const index = this.posts.findIndex(post => post.id === updatedPost.id);
          console.log(index, 'find index')

          if (index !== -1) {
            const updatedPosts = [...this.posts];
            updatedPosts.splice(index, 1, updatedPost);
            this.$store.dispatch("main/fetchPosts", updatedPosts);
          }
        }

        this.$store.dispatch("main/setUpdateVisible", {
          key: 'updateVisible', value: false
        })

        this.updatedTitle = "";
        this.updatedBody = "";

      } catch (error) {
        this.$store.dispatch('main/handleError', true);
        console.error("Error updating post:", error);
      }
    },

  cancelUpdate() {
    this.$store.dispatch('main/setUpdateVisible', {
      key: 'updateVisible', value: false
    });
    this.updatedTitle = '';
    this.updatedBody = '';
  },
  }
}
</script>

