<template>
  <div class="circuits">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="circuits && circuits.length > 0" class="table-responsive">
        <table class="table table-hover table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Circuit</th>
              <th scope="col">Location</th>
              <th scope="col">Country</th>
              <th scope="col">Wiki</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="circuit in circuits" :key="circuit.circuitId">
              <th scope="row">{{ circuit.circuitName || '-' }}</th>
              <td>{{ circuit.Location?.locality || '-' }}</td>
              <td>
                <span v-if="circuit.Location?.country">
                  {{ circuit.Location.country }}
                  <span v-if="getFlagEmoji(circuit.Location.country)" class="ms-1">
                    {{ getFlagEmoji(circuit.Location.country) }}
                  </span>
                </span>
                <span v-else>-</span>
              </td>
              <td>
                <a v-if="circuit.url" 
                   :href="circuit.url" 
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
        <i class="bi bi-geo-alt-fill" style="font-size: 3rem;"></i>
        <p class="mt-3">No circuits available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'Circuits',
  data() {
    return {
      circuits: [],
      loading: false,
      countryFlags: {
        'USA': '🇺🇸',
        'UK': '🇬🇧',
        'Italy': '🇮🇹',
        'Germany': '🇩🇪',
        'Spain': '🇪🇸',
        'Monaco': '🇲🇨',
        'Canada': '🇨🇦',
        'France': '🇫🇷',
        'Austria': '🇦🇹',
        'Belgium': '🇧🇪',
        'Netherlands': '🇳🇱',
        'Hungary': '🇭🇺',
        'Brazil': '🇧🇷',
        'Mexico': '🇲🇽',
        'Australia': '🇦🇺',
        'Japan': '🇯🇵',
        'Singapore': '🇸🇬',
        'UAE': '🇦🇪',
        'Bahrain': '🇧🇭',
        'Saudi Arabia': '🇸🇦',
        'Azerbaijan': '🇦🇿',
        'Russia': '🇷🇺',
        'China': '🇨🇳',
        'Portugal': '🇵🇹',
        'Qatar': '🇶🇦',
      }
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getF1Circuits',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('circuits');
  },
  methods: {
    async getF1Circuits() {
      if (this.$route.name !== "Circuits") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getCircuits(yearSlug);
        if (data) {
          this.circuits = data;
        }
      } catch (error) {
        console.error('Error fetching circuits:', error);
        if (error.response?.status === 404) {
          this.circuits = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    getFlagEmoji(country) {
      return this.countryFlags[country] || '';
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