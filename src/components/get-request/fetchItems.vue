<template>
  <div>
  <div class="list">
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>TITLE</th>
        <th>BODY</th>
        <th>EDIT POST</th>
        <th>DELETE POST</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.body }}</td>
        <td>
          <button @click="toggleEdit(post.id)">Edit</button>
        </td>
        <td>
          <button @click="removeItem(post.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
<!--    <div v-if="showDataList">-->
<!--      <UpdateItems />-->
<!--    </div>-->
  </div>
</template>

<script>
import '../../assets/css/base.css';
import { mapActions, mapGetters } from "vuex";
// import UpdateItems from "../put-request/updateItems.vue";
import { deletePost, getList } from "@/api/api.js";

export default {
  name: 'FetchItems',
  // components: { UpdateItems },

  computed: {
    ...mapGetters('main', ['posts', 'error', 'loading', 'showDataList', 'selectedPost']),
  },
  methods: {
    ...mapActions('main', ['fetchPosts']),

    async showData() {
      try {
        this.$store.dispatch('main/isLoading', { key: 'loading', value: true });
        this.$store.dispatch('main/handleError', { key: 'error', value: false });

        const response = await getList();

        if (response) {
          this.$store.dispatch('main/fetchPosts', response);
          this.$store.dispatch('main/setShowDataList', {
            key: 'showDataList', value: true
          });
        } else {
          console.error("No data received from API.");
        }

        this.$store.dispatch('main/isLoading', { key: 'loading', value: false });
      } catch (error) {
        console.error("Error fetching posts:", error);
        this.$store.dispatch('main/handleError', { key: 'error', value: true });
      }
    },

    toggleEdit(postId) {
      this.$store.dispatch('main/setShowDataList', {
        key: 'showDataList', value: true
      });
      this.$store.dispatch('main/setShowDataList', {
        key: 'selectedPost', value: postId
      });
    },

     async removeItem(postId) {
       try {

        console.log("Deleting post with ID:", postId);

        const response = await deletePost(postId);

        if (response && response.status === 200) {
          this.posts = this.posts.filter(post => post.id !== postId);

          this.$store.dispatch('main/deleteItem', postId);
        }

        this.$store.dispatch('main/setShowDataList', {
          key: 'showDataList', value: !this.selectedPost
        });

      } catch (error) {
        console.error("Error deleting post:", error);
        this.$store.dispatch('main/handleError', true);
      }
     }
  },
  created() {
    this.showData()
  },
  destroyed() {
    this.removeItem()
  }
}

</script>

<style scoped>
.list {
  width: 100%;
  height: auto;
  padding: 0 1rem;
  margin-top: 15px;
}

table {
  width: 100%;
  height: auto;
  border-radius: 10px;
  color: var(--vt-c-white);
  text-align: center;
}
table, th, tr, td {
  border-collapse: collapse;
  border: 1px solid var(--vt-c-black);
  background: #5062ca;
}
th {
  background: #e7eb1b !important;
  padding: 8px;
  color: var(--vt-c-black) !important;
}
td:nth-child(2) {
  padding-left: 5px;
  text-align: start !important;
}
button {
  background: none;
  color: var(--vt-c-white);
}
tr td:nth-child(4),
tr td:nth-child(5) {
  transition: background-color 0.3s ease, color 0.3s ease;
}

tr td:nth-child(4):hover,
tr td:nth-child(5):hover {
  background-color: #04AA6D !important;
  color: var(--vt-c-white) !important;
}
</style>
