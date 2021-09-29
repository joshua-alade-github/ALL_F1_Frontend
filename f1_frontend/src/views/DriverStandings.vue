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
            <th scope="row">{{driver.position}}</th>
            <td scope="row">{{driver.Driver.givenName}}, {{driver.Driver.familyName}}</td>
            <td scope="row">{{driver.points}}</td>
            <td scope="row">{{driver.wins}}</td>
            <td>{{driver.Driver.permanentNumber}}</td>
            <td>{{driver.Driver.code}}</td>
            <td>{{driver.Driver.nationality}}</td>
            <td>{{driver.Driver.dateOfBirth}}</td>
            <td>{{driver.Constructors[0].name}}</td>
            <td><a :href="driver.Driver.url" target="_blank">{{driver.Driver.url}}</a></td>
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
      year: '2021',
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
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/driver-standings/${yearSlug}/`)
        .then(response => {
          this.driverStandings = response.data
        })
        .catch( err => {
          console.log(err);
        })
    },
  },
}
</script>
