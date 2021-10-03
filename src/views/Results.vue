<template>
  <div class="results">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Round, Season</th>
            <th scope="col">Race</th>
            <th scope="col">Date</th>
            <th scope="col">Driver - Race Winner</th>
            <th scope="col">Driver - Race Time</th>
            <th scope="col">Points</th>
            <th scope="col">Constructor - Race Winner</th>
            <th scope="col">Wiki</th>
            <th scope="col">Qualifiers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in reversedResults" :key="result.round">
            <th v-if="result.season" scope="row"><router-link class="text-decoration-none" :to="{path: '/results/' + result.season + '/' + result.round}">{{result.round}}</router-link>, {{result.season}}</th>
            <td v-else></td>
            <td v-if="result.raceName">{{result.raceName}}</td>
            <td v-else></td>
            <td v-if="result.date">{{result.date}}</td>
            <td v-else></td>
            <td v-if="result.Results[0].Driver.givenName">{{result.Results[0].Driver.givenName}} {{result.Results[0].Driver.familyName}}</td>
            <td v-else></td>
            <td v-if="result.Results[0].Driver.Time">{{result.Results[0].Time.time}}</td>
            <td v-else></td>
            <td v-if="result.Results[0].points">{{result.Results[0].points}}</td>
            <td v-else></td>
            <td v-if="result.Results[0].Constructor.name">{{result.Results[0].Constructor.name}}</td>
            <td v-else></td>
            <td v-if="result.url"><a class="text-decoration-none" :href="result.url" target="_blank">{{result.url}}</a></td>
            <td v-else></td>
            <td v-if="result.season"><router-link class="text-decoration-none" :to="{path: '/qualifying/' + result.season + '/' + result.round}">Qualifier</router-link></td>
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
  name: 'Results',
  data() {
    return {
      results: []
    }
  },
  computed: {
    reversedResults() {
        return this.results.slice().reverse();
    }     
  },
  watch: {
    $route() {
      this.getF1Results()
    }
  },
  created() {
    this.getF1Results()
  },
  methods: {
    async getF1Results(){
      if (this.$route.name !== "Results") return
      this.$store.commit('setIsLoading', true)
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/results/${yearSlug}/`)
        .then(response => {
          this.results = response.data
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
