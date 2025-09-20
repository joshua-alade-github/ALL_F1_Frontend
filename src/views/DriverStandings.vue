<template>
  <div class="driver_standings">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="driverStandings && driverStandings.length > 0" class="table-responsive">
        <table class="table table-hover table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Position</th>
              <th scope="col">Driver</th>
              <th scope="col">Points</th>
              <th scope="col">Wins</th>
              <th scope="col">Number</th>
              <th scope="col">Code</th>
              <th scope="col">Nationality</th>
              <th scope="col">DOB</th>
              <th scope="col">Constructor</th>
              <th scope="col">Wiki</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in driverStandings" :key="driver.position">
              <th scope="row">{{ driver.position || '-' }}</th>
              <td>
                <span v-if="driver.Driver">
                  {{ driver.Driver.givenName || '' }} {{ driver.Driver.familyName || '' }}
                </span>
                <span v-else>-</span>
              </td>
              <td>{{ driver.points || '0' }}</td>
              <td>{{ driver.wins || '0' }}</td>
              <td>{{ driver.Driver?.permanentNumber || '-' }}</td>
              <td>{{ driver.Driver?.code || '-' }}</td>
              <td>{{ driver.Driver?.nationality || '-' }}</td>
              <td>{{ driver.Driver?.dateOfBirth || '-' }}</td>
              <td>
                <span v-if="driver.Constructors && driver.Constructors[0]">
                  {{ driver.Constructors[0].name }}
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <a v-if="driver.Driver?.url" :href="driver.Driver.url" target="_blank" class="text-decoration-none">
                  <i class="bi bi-box-arrow-up-right"></i>
                </a>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="!loading" class="empty-state text-center p-5">
        <i class="bi bi-trophy" style="font-size: 3rem;"></i>
        <p class="mt-3">No driver standings available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'DriverStandings',
  data() {
    return {
      driverStandings: [],
      loading: false,
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getF1DriverStandings',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('driverStandings');
  },
  methods: {
    async getF1DriverStandings() {
      if (this.$route.name !== "DriverStandings") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getDriverStandings(yearSlug);
        if (data) {
          this.driverStandings = data;
        }
      } catch (error) {
        console.error('Error fetching driver standings:', error);
        if (error.response?.status === 404) {
          this.driverStandings = [];
        }
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.empty-state {
  color: #6c757d;
}

.skeleton-loader {
  padding: 1rem 0;
}
</style>