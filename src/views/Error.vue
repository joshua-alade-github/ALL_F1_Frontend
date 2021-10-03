<template>
  <div class="Error">
      <h1>This page doesn't exist!</h1>
      <router-link :to="{name: 'Home'}"><h3>Go Home</h3></router-link>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setIsLoading', false)
  },
}
</script>

<style lang="scss" scoped>
  .Error {
      margin-top: 20%;
      margin-left: 20%;
  }
</style>