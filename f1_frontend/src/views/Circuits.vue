<template>
  <div class="circuits">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Circuit</th>
            <th scope="col">Location</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="circuit in circuits" :key="circuit.circuitId">
            <th v-if="circuit.circuitName" scope="row">{{circuit.circuitName}}</th>
            <th v-else scope="row"></th>
            <td v-if="circuit.Location">{{circuit.Location.locality}}, {{circuit.Location.country}}</td>
            <td v-else></td>
            <td v-if="circuit.url"><a :href="circuit.url" target="_blank">{{circuit.url}}</a></td>
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
  name: 'Circuits',
  data() {
    return {
      circuits: []
    }
  },
  watch: {
    $route() {
      this.getF1Circuits()
    }
  },
  created() {
    this.getF1Circuits()
  },
  methods: {
    async getF1Circuits(){
      if (this.$route.name !== "Circuits") return
      this.$store.commit('setIsLoading', true)
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/circuits/${yearSlug}/`)
        .then(response => {
          this.circuits = response.data
        })
        .catch( err => {
          console.log(err);
          this.$router.push("/error")
        })
      this.$store.commit('setIsLoading', false)
    }
  },
}
</script>
