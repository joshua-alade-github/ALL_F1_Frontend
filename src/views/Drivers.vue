<template>
  <div class="drivers">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="drivers && drivers.length > 0" class="table-responsive">
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
              <th scope="row">
                <span v-if="driver.givenName || driver.familyName">
                  {{ driver.givenName || '' }} {{ driver.familyName || '' }}
                </span>
                <span v-else>-</span>
              </th>
              <td>{{ driver.permanentNumber || '-' }}</td>
              <td>{{ driver.code || '-' }}</td>
              <td>{{ driver.nationality || '-' }}</td>
              <td>{{ formatDate(driver.dateOfBirth) || '-' }}</td>
              <td>
                <a v-if="driver.url" 
                   :href="driver.url" 
                   target="_blank"
                   class="text-decoration-none">
                  <i class="bi bi-box-arrow-up-right"></i> Wiki
                </a>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="!loading" class="empty-state text-center p-5">
        <i class="bi bi-person-fill" style="font-size: 3rem;"></i>
        <p class="mt-3">No drivers available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'Drivers',
  data() {
    return {
      drivers: [],
      loading: false,
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getDrivers',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('drivers');
  },
  methods: {
    async getDrivers() {
      if (this.$route.name !== "Drivers") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getDrivers(yearSlug);
        if (data) {
          this.drivers = data;
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
        if (error.response?.status === 404) {
          this.drivers = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(date) {
      if (!date) return null;
      try {
        return new Date(date).toLocaleDateString();
      } catch {
        return date;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.empty-state {
  color: #6c757d;
  
  i {
    color: #dee2e6;
  }
}

.skeleton-loader {
  padding: 1rem 0;
}
</style>