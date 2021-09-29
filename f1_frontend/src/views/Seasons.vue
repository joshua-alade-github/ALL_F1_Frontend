<template>
  <div class="seasons">
    <div class="table-div">
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Season</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="season in seasons.reverse()" :key="season.season">
            <th scope="row"><router-link :to="{path: '/results/' + season.season}">{{season.season}}</router-link></th>
            <td><a :href="season.url" target="_blank">{{season.url}}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Seasons',
  data() {
    return {
      seasons: []
    }
  },
  created() {
    this.getF1Seasons()
  },
  methods: {
    async getF1Seasons(){
      await axios.get('/api/seasons/')
        .then(response => {
          this.seasons = response.data
        })
        .catch( err => {
          console.log(err);
        })
    }
  },
}
</script>