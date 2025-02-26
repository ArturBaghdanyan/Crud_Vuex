<template>
  <div>

  <header>
    <nav>
      <span @click="showData">Fetch List</span>
      <span @click="openModal">Add Item</span>
    </nav>
  </header>

  <div v-if="showDataList">
    <FetchItems />
  </div>

  <div v-if="createShowItem">
    <CreatePost />
  </div>
</div>

</template>

<script>
import FetchItems from "@/components/get-request/fetchItems.vue";
import CreatePost from "@/components/post-request/createItems.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  components: {
    FetchItems,
    CreatePost
  },
    computed: {
      ...mapGetters("main", ["showDataList", "createShowItem"]),
    },
  methods: {
    ...mapActions("main", ['fetchPosts']),

    showData() {
      this.$store.dispatch(
          'main/setShowDataList',
          { key: 'showDataList', value: !this.showDataList});
    },
    openModal() {
      this.$store.dispatch("main/setShowDataList",
          { key: 'createShowItem', value: !this.createShowItem });
    }
  },
}
</script>

<style>
App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

header {
  width: 100%;
  height: 60px;
  background: #2c3e50;
  display: flex;
  align-items: center;
  position: relative;
}

header > nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

header > nav > span {
  color: white;
  text-decoration: none;
  font-size: 17px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

header > nav > span:hover {
  border-radius: 5px;
  padding: 8px;
  background-color: #04AA6D !important;
  color: var(--vt-c-white) !important;
}

</style>

