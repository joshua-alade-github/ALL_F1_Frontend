<template>
  <div class="drivers">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Driver</th>
            <th scope="col">Number</th>
            <th scope="col">Code</th>
            <th scope="col">Nationality</th>
            <th scope="col">DOB</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in drivers" :key="driver.driverId">
            <th v-if="driver.givenName" scope="row">{{driver.givenName}}, {{driver.familyName}}</th>
            <td v-else></td>
            <td v-if="driver.permanentNumber">{{driver.permanentNumber}}</td>
            <td v-else></td>
            <td v-if="driver.code">{{driver.code}}</td>
            <td v-else></td>
            <td v-if="driver.nationality">{{driver.nationality}}</td>
            <td v-else></td>
            <td v-if="driver.dateOfBirth">{{driver.dateOfBirth}}</td>
            <td v-else></td>
            <td v-if="driver.url"><a :href="driver.url" target="_blank">{{driver.url}}</a></td>
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
  name: 'Drivers',
  data() {
    return {
      drivers: []
    }
  },
  watch: {
    $route() {
      this.getDrivers()
    }
  },
  created() {
    this.getDrivers()
  },
  methods: {
    async getDrivers(){
      this.$store.commit('setIsLoading', true)
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/drivers/${yearSlug}/`)
        .then(response => {
          this.drivers = response.data
        })
        .catch( err => {
          console.log(err);
          //this.$router.push("/error")
        })
      this.$store.commit('setIsLoading', false)
    }
  },
}
</script>
