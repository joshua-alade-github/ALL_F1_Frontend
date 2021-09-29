<template>
  <div class="constructor_standings">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Position</th>
            <th scope="col">Constructor</th>
            <th scope="col">Points</th>
            <th scope="col">Wins</th>
            <th scope="col">Nationality</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="constructor in constructorStandings" :key="constructor.position">
            <th scope="row">{{constructor.position}}</th>
            <td scope="row">{{constructor.Constructor.name}}</td>
            <td scope="row">{{constructor.points}}</td>
            <td scope="row">{{constructor.wins}}</td>
            <td scope="row">{{constructor.Constructor.nationality}}</td>
            <td><a :href="constructor.Constructor.url" target="_blank">{{constructor.Constructor.url}}</a></td>
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
  name: 'ConstructorStandings',
  data() {
    return {
      constructorStandings: []
    }
  },
  watch: {
    $route() {
      this.getF1ConstructorStandings()
    }
  },
  created() {
    this.getF1ConstructorStandings()
  },
  methods: {
    async getF1ConstructorStandings(){
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/constructor-standings/${yearSlug}/`)
        .then(response => {
          this.constructorStandings = response.data
        })
        .catch( err => {
          console.log(err);
        })
    }
  },
}
</script>
