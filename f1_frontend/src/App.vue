<template>
  <div>
    <NavBar v-if="this.$route.path !== '/'" />
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap';
  @import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .table-div {
    padding: 5%;
  }
  .table {
    border: 3px solid grey;
  }
</style>