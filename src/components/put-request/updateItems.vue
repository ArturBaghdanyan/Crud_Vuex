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
import {mapActions, mapGetters} from "vuex";
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
    ...mapGetters("main", ['error', 'selectedPost', 'updateVisible'])
  },

  methods: {
    ...mapActions("main", ["fetchPosts"]),

    async updatePostData() {
      // console.log(this.selectedPost, 'selectedPost')

      const updatedPost = {
        id: this.selectedPost.id,
        title: this.updatedTitle,
        body: this.updatedBody,
      }

      console.log(updatedPost.id, 'id') //undefined

      try {
        await updatePost(updatedPost);

        this.$store.dispatch("main/fetchPosts", updatedPost)

        this.$store.dispatch("main/setUpdateVisible", {
          key: 'updateVisible', value: true
        })
        const index = this.posts.findIndex(post => post.id === updatedPost.id);
        console.log(index, 'find index')

        if (index !== -1) {
          this.posts.splice(index, 1, updatedPost);
        }

        this.$store.dispatch('main/setUpdateVisible', false);

        this.updatedTitle = "";
        this.updatedBody = "";

      } catch (error) {
        this.$store.dispatch('main/handleError', true);
        console.error("Error updating post:", error);
      }
    },

  cancelUpdate() {
    this.updatedTitle = '';
    this.updatedBody = '';
    this.$store.dispatch('main/setUpdateVisible', {
      key: 'updateVisible', value: false
    });
  },
  }
}
</script>

