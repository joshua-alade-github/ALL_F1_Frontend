<template>
  <div class="qualifying_results">
    <div class="table-div">
      <a class="back-button text-decoration-none" @click="$router.go(-1)"><i class="bi bi-arrow-left-circle"></i> back</a>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{raceName}}</h5>
          <p class="card-text">Season: {{season}}</p>
          <p class="card-text">Round: {{round}}, qualifiers</p>
          <p class="card-text">Date: {{date}}</p>
          <a :href="wiki" target="_blank" class="btn btn-primary">{{raceName}}</a>
        </div>
      </div>
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Driver</th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Code</th>
            <th scope="col">Constructor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.position">
            <th v-if="result.position" scope="row">{{result.position}}</th>
            <td v-else></td>
            <td v-if="result.Driver">{{result.Driver.givenName}}, {{result.Driver.familyName}}</td>
            <td v-else></td>
            <td v-if="result.Q1">{{result.Q1}}</td>
            <td v-else></td>
            <td v-if="result.Q2">{{result.Q2}}</td>
            <td v-else></td>
            <td v-if="result.Q3">{{result.Q3}}</td>
            <td v-else></td>
            <td v-if="result.Driver">{{result.Driver.code}}</td>
            <td v-else></td>
            <td v-if="result.Constructor">{{result.Constructor.name}}</td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'QualifyingResults',
  data() {
    return {
      results: [],
      raceName: "",
      round: "",
      season: "",
      date: "",
      wiki: "",
    }
  },
  watch: {
    $route() {
      this.getF1QualifyingResults()
    }
  },
  created() {
    this.getF1QualifyingResults()
  },
  methods: {
    async getF1QualifyingResults(){
      this.$store.commit('setIsLoading', true)
      if (this.$route.name !== "QualifyingResults") return
      const yearSlug = this.$route.params.year_slug
      const roundSlug = this.$route.params.round_slug
      await axios.get(`/api/qualifying/${yearSlug}/${roundSlug}/`)
        .then(response => {
          this.results = response.data.QualifyingResults
          this.raceName = response.data.raceName
          this.date = response.data.date
          this.round = response.data.round
          this.season = response.data.season
          this.wiki = response.data.url
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

<style lang="scss" scoped>
  .card {
    margin: auto;
    width: 50%;
    margin-bottom: 10px;
  }
  .back-button {
    cursor: pointer;
    font-size: 1.5rem;
    color: rgb(33,37,41);
  }
</style>