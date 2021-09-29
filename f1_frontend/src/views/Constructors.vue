<template>
  <div class="constructors">
    <div class="table-div">
      <Dropdown />
      <table class="table table-hover table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Constructor</th>
            <th scope="col">Nationality</th>
            <th scope="col">Wiki</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="constructor in constructors" :key="constructor.constructorId">
            <th scope="row">{{constructor.name}}</th>
            <td>{{constructor.nationality}}</td>
            <td><a :href="constructor.url" target="_blank">{{constructor.url}}</a></td>
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
  name: 'Constructors',
  data() {
    return {
      constructors: []
    }
  },
  watch: {
    $route() {
      this.getF1Constructors()
    }
  },
  created() {
    this.getF1Constructors()
  },
  methods: {
    async getF1Constructors(){
      const yearSlug = this.$route.params.year_slug
      await axios.get(`/api/constructors/${yearSlug}/`)
        .then(response => {
          this.constructors = response.data
        })
        .catch( err => {
          console.log(err);
        })
    }
  },
}
</script>
