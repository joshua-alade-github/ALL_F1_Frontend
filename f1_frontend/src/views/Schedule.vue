<template>
  <div class="schedule">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Round</th>
            <th scope="col">Circuit</th>
            <th scope="col">Race Name</th>
            <th scope="col">Date</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="race in schedule" :key="race.round">
            <th v-if="race.round" scope="row">{{race.round}}</th>
            <td v-else></td>
            <td v-if="race.Circuit.circuitName">{{race.Circuit.circuitName}}</td>
            <td v-else></td>
            <td v-if="race.raceName">{{race.raceName}}</td>
            <td v-else></td>
            <td v-if="race.date">{{race.date}}</td>
            <td v-else></td>
            <td v-if="race.url"><a :href="race.url" target="_blank">{{race.url}}</a></td>
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
  name: 'Schedule',
  data() {
    return {
      schedule: []
    }
  },
  watch: {
    $route() {
      this.getF1Schedule()
    }
  },
  created() {
    this.getF1Schedule()
  },
  methods: {
    async getF1Schedule(){
      if (this.$route.name !== "Schedule") return
      this.$store.commit('setIsLoading', true)
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/schedule/${yearSlug}/`)
        .then(response => {
          this.schedule = response.data
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
