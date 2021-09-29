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
          <tr v-for="result in results.reverse()" :key="result.round">
            <th scope="row"><router-link class="text-decoration-none" :to="{path: '/results/' + result.season + '/' + result.round}">{{result.round}}</router-link>, {{result.season}}</th>
            <td>{{result.raceName}}</td>
            <td>{{result.date}}</td>
            <td>{{result.Results[0].Driver.givenName}} {{result.Results[0].Driver.familyName}}</td>
            <td>{{result.Results[0].Time.time}}</td>
            <td>{{result.Results[0].points}}</td>
            <td>{{result.Results[0].Constructor.name}}</td>
            <td><a class="text-decoration-none" :href="result.url" target="_blank">{{result.url}}</a></td>
            <td scope="row"><router-link class="text-decoration-none" :to="{path: '/qualifying/' + result.season + '/' + result.round}">Qualifier</router-link></td>
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
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/results/${yearSlug}/`)
        .then(response => {
          this.results = response.data
        })
        .catch( err => {
          console.log(err);
        })
    }
  },
}
</script>
