<template>
  <div class="driver_standings">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Driver</th>
            <th scope="col">Points</th>
            <th scope="col">Wins</th>
            <th scope="col">Number</th>
            <th scope="col">Code</th>
            <th scope="col">Nationality</th>
            <th scope="col">DOB</th>
            <th scope="col">Constructor</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in driverStandings" :key="driver.position">
            <th v-if="driver.position" scope="row">{{driver.position}}</th>
            <td v-else></td>
            <td v-if="driver.Driver.givenName">{{driver.Driver.givenName}}, {{driver.Driver.familyName}}</td>
            <td v-else></td>
            <td v-if="driver.points">{{driver.points}}</td>
            <td v-else></td>
            <td v-if="driver.wins">{{driver.wins}}</td>
            <td v-else></td>
            <td v-if="driver.Driver.permanentNumber">{{driver.Driver.permanentNumber}}</td>
            <td v-else></td>
            <td v-if="driver.Driver.code">{{driver.Driver.code}}</td>
            <td v-else></td>
            <td v-if="driver.Driver.nationality">{{driver.Driver.nationality}}</td>
            <td v-else></td>
            <td v-if="driver.Driver.dateOfBirth">{{driver.Driver.dateOfBirth}}</td>
            <td v-else></td>
            <td v-if="driver.Constructors[0].name">{{driver.Constructors[0].name}}</td>
            <td v-else></td>
            <td v-if="driver.Driver.url"><a :href="driver.Driver.url" target="_blank">{{driver.Driver.url}}</a></td>
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
  name: 'DriverStandings',
  data() {
    return {
      driverStandings: [],
    }
  },
  watch: {
    $route() {
      this.getF1DriverStandings()
    }
  },
  created() {
    this.getF1DriverStandings()
  },
  methods: {
    async getF1DriverStandings(){
      if (this.$route.name !== "DriverStandings") return
      this.$store.commit('setIsLoading', true)
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/driver-standings/${yearSlug}/`)
        .then(response => {
          this.driverStandings = response.data
        })
        .catch( err => {
          console.log(err);
          this.$store.commit('setIsLoading', false)
          this.$router.push("/error")
        })
      this.$store.commit('setIsLoading', false)
    },
  },
}
</script>
