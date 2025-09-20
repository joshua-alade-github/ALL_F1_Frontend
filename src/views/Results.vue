<template>
  <div class="results">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="reversedResults && reversedResults.length > 0" class="table-responsive">
        <table class="table table-hover table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Round, Season</th>
              <th scope="col">Race</th>
              <th scope="col">Date</th>
              <th scope="col">Driver - Race Winner</th>
              <th scope="col">Race Time</th>
              <th scope="col">Points</th>
              <th scope="col">Constructor</th>
              <th scope="col">Wiki</th>
              <th scope="col">Qualifiers</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in reversedResults" :key="result.round">
              <th scope="row">
                <router-link 
                  v-if="result.season && result.round"
                  class="text-decoration-none" 
                  :to="`/results/${result.season}/${result.round}`">
                  {{ result.round }}
                </router-link>
                <span v-else>{{ result.round || '-' }}</span>
                <span v-if="result.season">, {{ result.season }}</span>
              </th>
              <td>{{ result.raceName || '-' }}</td>
              <td>{{ formatDate(result.date) || '-' }}</td>
              <td>
                <span v-if="getWinnerDriver(result)">
                  {{ getWinnerDriver(result) }}
                </span>
                <span v-else>-</span>
              </td>
              <td>{{ getWinnerTime(result) || '-' }}</td>
              <td>{{ getWinnerPoints(result) || '-' }}</td>
              <td>{{ getWinnerConstructor(result) || '-' }}</td>
              <td>
                <a v-if="result.url" 
                   :href="result.url" 
                   target="_blank" 
                   class="text-decoration-none">
                  <i class="bi bi-box-arrow-up-right"></i>
                </a>
                <span v-else>-</span>
              </td>
              <td>
                <router-link 
                  v-if="result.season && result.round"
                  class="text-decoration-none" 
                  :to="`/qualifying/${result.season}/${result.round}`">
                  Qualifier
                </router-link>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="!loading" class="empty-state text-center p-5">
        <i class="bi bi-flag-fill" style="font-size: 3rem;"></i>
        <p class="mt-3">No results available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'Results',
  data() {
    return {
      results: [],
      loading: false,
    }
  },
  computed: {
    reversedResults() {
      return this.results.slice().reverse();
    }     
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getF1Results',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('results');
  },
  methods: {
    async getF1Results() {
      if (this.$route.name !== "Results") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getResults(yearSlug);
        if (data) {
          this.results = data;
        }
      } catch (error) {
        console.error('Error fetching results:', error);
        if (error.response?.status === 404) {
          this.results = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    getWinnerDriver(result) {
      if (result?.Results?.[0]?.Driver) {
        const driver = result.Results[0].Driver;
        return `${driver.givenName || ''} ${driver.familyName || ''}`.trim();
      }
      return null;
    },
    
    getWinnerTime(result) {
      return result?.Results?.[0]?.Time?.time || null;
    },
    
    getWinnerPoints(result) {
      return result?.Results?.[0]?.points || null;
    },
    
    getWinnerConstructor(result) {
      return result?.Results?.[0]?.Constructor?.name || null;
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
}

.skeleton-loader {
  padding: 1rem 0;
}
</style>