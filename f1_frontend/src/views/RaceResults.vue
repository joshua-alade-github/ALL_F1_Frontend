<template>
  <div class="race_results">
    <div class="table-div">
      <a class="back-button text-decoration-none" @click="$router.go(-1)"><i class="bi bi-arrow-left-circle"></i> back</a>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{raceName}}</h5>
          <p class="card-text">Season: {{season}}</p>
          <p class="card-text">Round: {{round}}</p>
          <p class="card-text">Date: {{date}}</p>
          <a :href="wiki" target="_blank" class="btn btn-primary">{{raceName}}</a>
        </div>
      </div>
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Driver</th>
            <th scope="col">Starting Position</th>
            <th scope="col">Points</th>
            <th scope="col">Status</th>
            <th scope="col">Laps</th>
            <th scope="col">Time</th>
            <th scope="col">Code</th>
            <th scope="col">Constructor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="result in results" :key="result.position">
            <th v-if="result.position" scope="row">{{result.position}}</th>
            <td v-else></td>
            <td v-if="result.Driver.givenName">{{result.Driver.givenName}}, {{result.Driver.familyName}}</td>
            <td v-else></td>
            <td v-if="result.grid > result.position"><i class="bi bi-caret-up-fill" style="font-size: 1.2rem; color: lightgreen;"></i> {{result.grid}}</td>
            <td v-else-if="result.grid < result.position"><i class="bi bi-caret-down-fill" style="font-size: 1.2rem; color: red;"></i> {{result.grid}}</td>
            <td v-else-if="result.grid"><i class="bi bi-caret-left-fill" style="font-size: 1.2rem;"></i> {{result.grid}}</td>
            <td v-else></td>
            <td v-if="result.points">{{result.points}}</td>
            <td v-else></td>
            <td v-if="result.status">{{result.status}}</td>
            <td v-else></td>
            <td v-if="result.laps">{{result.laps}}</td>
            <td v-else></td>
            <td v-if="result.Time">{{result.Time.time}}</td>
            <td v-else></td>
            <td v-if="result.Driver.code">{{result.Driver.code}}</td>
            <td v-else></td>
            <td v-if="result.Constructor.name">{{result.Constructor.name}}</td>
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
  name: 'RaceResults',
  data() {
    return {
      results: [],
      raceName: "",
      round: "",
      season: "",
      date: "",
      wiki: "",
      year: '2021',
    }
  },
  watch: {
    $route() {
      this.getF1ResultsRound()
    }
  },
  created() {
    this.getF1ResultsRound()
  },
  methods: {
    async getF1ResultsRound(){
      const yearSlug = this.$route.params.year_slug
      const roundSlug = this.$route.params.round_slug
      await axios.get(`/api/results/${yearSlug}/${roundSlug}/`)
        .then(response => {
          this.results = response.data.Results
          this.raceName = response.data.raceName
          this.date = response.data.date
          this.round = response.data.round
          this.season = response.data.season
          this.wiki = response.data.url
        })
        .catch( err => {
          console.log(err);
          //this.$router.push("/error")
        })
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