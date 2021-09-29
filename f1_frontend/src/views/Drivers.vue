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
            <th scope="row">{{driver.givenName}}, {{driver.familyName}}</th>
            <td>{{driver.permanentNumber}}</td>
            <td>{{driver.code}}</td>
            <td>{{driver.nationality}}</td>
            <td>{{driver.dateOfBirth}}</td>
            <td><a :href="driver.url" target="_blank">{{driver.url}}</a></td>
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
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/drivers/${yearSlug}/`)
        .then(response => {
          this.drivers = response.data
        })
        .catch( err => {
          console.log(err);
        })
    }
  },
}
</script>
