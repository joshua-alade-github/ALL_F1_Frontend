<template>
  <div class="constructor_standings">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Constructor</th>
            <th scope="col">Points</th>
            <th scope="col">Wins</th>
            <th scope="col">Nationality</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="constructor in constructorStandings" :key="constructor.position">
            <th v-if="constructor.position" scope="row">{{constructor.position}}</th>
            <td v-else></td>
            <td v-if="constructor.Constructor.name">{{constructor.Constructor.name}}</td>
            <td v-else></td>
            <td v-if="constructor.points">{{constructor.points}}</td>
            <td v-else></td>
            <td v-if="constructor.wins">{{constructor.wins}}</td>
            <td v-else></td>
            <td v-if="constructor.Constructor.nationality">{{constructor.Constructor.nationality}}</td>
            <td v-else></td>
            <td v-if="constructor.Constructor.url"><a :href="constructor.Constructor.url" target="_blank">{{constructor.Constructor.url}}</a></td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dropdown from '../components/Dropdown.vue'

export default {
  components: { Dropdown },
  name: 'ConstructorStandings',
  data() {
    return {
      constructorStandings: []
    }
  },
  watch: {
    $route() {
      this.getF1ConstructorStandings()
    }
  },
  created() {
    this.getF1ConstructorStandings()
  },
  methods: {
    async getF1ConstructorStandings(){
      if (this.$route.name !== "ConstructorStandings") return
      this.$store.commit('setIsLoading', true)
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/constructor-standings/${yearSlug}/`)
        .then(response => {
          this.constructorStandings = response.data
        })
        .catch( err => {
          console.log(err);
          this.$store.commit('setIsLoading', false)
          this.$router.push("/error")
        })
      this.$store.commit('setIsLoading', false)
    }
  },
}
</script>
