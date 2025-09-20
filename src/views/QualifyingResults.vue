<template>
  <div class="qualifying_results">
    <div class="table-div">
      <a class="back-button text-decoration-none" @click="$router.go(-1)">
        <i class="bi bi-arrow-left-circle"></i> back
      </a>
      
      <div v-if="raceName && !loading" class="card">
        <div class="card-body">
          <h5 class="card-title">{{ raceName }} - Qualifying</h5>
          <p class="card-text">Season: {{ season }}</p>
          <p class="card-text">Round: {{ round }}</p>
          <p class="card-text">Date: {{ formatDate(date) }}</p>
          <a v-if="wiki" :href="wiki" target="_blank" class="btn btn-primary">
            {{ raceName }} <i class="bi bi-box-arrow-up-right"></i>
          </a>
          <router-link 
            v-if="season && round"
            :to="`/results/${season}/${round}`" 
            class="btn btn-secondary ms-2">
            View Race Results
          </router-link>
        </div>
      </div>
      
      <div v-if="loading" class="skeleton-loader mt-3">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="results && results.length > 0" class="table-responsive mt-3">
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
              <th scope="row">{{ result.position || '-' }}</th>
              <td>
                <span v-if="result.Driver">
                  {{ result.Driver.givenName || '' }} {{ result.Driver.familyName || '' }}
                </span>
                <span v-else>-</span>
              </td>
              <td :class="getQualifyingClass(result, 'Q1')">
                {{ result.Q1 || '-' }}
              </td>
              <td :class="getQualifyingClass(result, 'Q2')">
                {{ result.Q2 || '-' }}
              </td>
              <td :class="getQualifyingClass(result, 'Q3')">
                {{ result.Q3 || '-' }}
                <span v-if="result.position === '1' && result.Q3" class="badge bg-success ms-1">
                  POLE
                </span>
              </td>
              <td>{{ result.Driver?.code || '-' }}</td>
              <td>{{ result.Constructor?.name || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="!loading" class="empty-state text-center p-5">
        <i class="bi bi-stopwatch" style="font-size: 3rem;"></i>
        <p class="mt-3">No qualifying results available</p>
      </div>
    </div>
  </div>
</template>

<script>
import f1API from '@/utils/api';

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
      loading: false,
    }
  },
  watch: {
    '$route.params': {
      handler: 'getF1QualifyingResults',
      immediate: true,
      deep: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('qualifying');
  },
  methods: {
    async getF1QualifyingResults() {
      if (this.$route.name !== "QualifyingResults") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      const roundSlug = this.$route.params.round_slug;
      
      try {
        const data = await f1API.getQualifyingResults(yearSlug, roundSlug);
        if (data) {
          this.results = data.QualifyingResults || [];
          this.raceName = data.raceName || "";
          this.date = data.date || "";
          this.round = data.round || "";
          this.season = data.season || "";
          this.wiki = data.url || "";
        }
      } catch (error) {
        console.error('Error fetching qualifying results:', error);
        if (error.response?.status === 404) {
          this.results = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    getQualifyingClass(result, session) {
      if (!result[session]) return '';
      
      if (session === 'Q3' && result.Q3) return 'fw-bold text-success';
      if (session === 'Q2' && result.Q2 && !result.Q3) return 'fw-bold text-warning';
      if (session === 'Q1' && result.Q1 && !result.Q2) return 'fw-bold text-danger';
      
      return '';
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
.card {
  margin: auto;
  max-width: 600px;
  margin-bottom: 1rem;
}

.back-button {
  cursor: pointer;
  font-size: 1.5rem;
  color: rgb(33,37,41);
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.7;
  }
}

.empty-state {
  color: #6c757d;
  
  i {
    color: #dee2e6;
  }
}

.skeleton-loader {
  padding: 1rem 0;
}

.badge {
  font-size: 0.6rem;
}
</style>