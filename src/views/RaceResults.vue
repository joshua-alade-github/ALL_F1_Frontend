<template>
  <div class="race_results">
    <div class="table-div">
      <a class="back-button text-decoration-none" @click="$router.go(-1)">
        <i class="bi bi-arrow-left-circle"></i> back
      </a>
      
      <div v-if="raceName && !loading" class="card">
        <div class="card-body">
          <h5 class="card-title">{{ raceName }}</h5>
          <p class="card-text">Season: {{ season }}</p>
          <p class="card-text">Round: {{ round }}</p>
          <p class="card-text">Date: {{ formatDate(date) }}</p>
          <a v-if="wiki" :href="wiki" target="_blank" class="btn btn-primary">
            {{ raceName }} <i class="bi bi-box-arrow-up-right"></i>
          </a>
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
              <th scope="row">{{ result.position || '-' }}</th>
              <td>
                <span v-if="result.Driver">
                  {{ result.Driver.givenName || '' }} {{ result.Driver.familyName || '' }}
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <span v-if="result.grid" class="position-change">
                  <i v-if="getPositionChange(result) > 0" 
                     class="bi bi-caret-up-fill text-success"></i>
                  <i v-else-if="getPositionChange(result) < 0" 
                     class="bi bi-caret-down-fill text-danger"></i>
                  <i v-else 
                     class="bi bi-caret-right-fill text-muted"></i>
                  {{ result.grid }}
                </span>
                <span v-else>-</span>
              </td>
              <td>{{ result.points || '0' }}</td>
              <td>{{ result.status || '-' }}</td>
              <td>{{ result.laps || '-' }}</td>
              <td>{{ result.Time?.time || '-' }}</td>
              <td>{{ result.Driver?.code || '-' }}</td>
              <td>{{ result.Constructor?.name || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else-if="!loading" class="empty-state text-center p-5">
        <i class="bi bi-flag-fill" style="font-size: 3rem;"></i>
        <p class="mt-3">No race results available</p>
      </div>
    </div>
  </div>
</template>

<script>
import f1API from '@/utils/api';

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
      loading: false,
    }
  },
  watch: {
    '$route.params': {
      handler: 'getF1ResultsRound',
      immediate: true,
      deep: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('resultsRound');
  },
  methods: {
    async getF1ResultsRound() {
      if (this.$route.name !== "RaceResults") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      const roundSlug = this.$route.params.round_slug;
      
      try {
        const data = await f1API.getResultsRound(yearSlug, roundSlug);
        if (data) {
          this.results = data.Results || [];
          this.raceName = data.raceName || "";
          this.date = data.date || "";
          this.round = data.round || "";
          this.season = data.season || "";
          this.wiki = data.url || "";
        }
      } catch (error) {
        console.error('Error fetching race results:', error);
        if (error.response?.status === 404) {
          this.$router.push("/error");
        }
      } finally {
        this.loading = false;
      }
    },
    
    getPositionChange(result) {
      const grid = parseInt(result.grid);
      const position = parseInt(result.position);
      if (isNaN(grid) || isNaN(position)) return 0;
      return grid - position;
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

.position-change {
  i {
    font-size: 1.2rem;
    margin-right: 0.25rem;
  }
}

.empty-state {
  color: #6c757d;
}

.skeleton-loader {
  padding: 1rem 0;
}
</style>