<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">ALL F1</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse pl-5" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="`/driver-standings/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Driver Standings</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/constructor-standings/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Constructor Standings</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/results/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Results</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/schedule/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Schedule</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/circuits/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Circuits</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/seasons" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Seasons</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/drivers/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Drivers</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/constructors/${currentYear}`" class="nav-link pointer" data-toggle="collapse" data-target=".navbar-collapse.show">Constructors</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "NavBar",
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
};
</script>

<style lang="scss" scoped>
  .pointer {cursor: pointer;}
</style>