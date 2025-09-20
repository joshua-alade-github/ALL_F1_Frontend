<template>
  <div class="constructor_standings">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="constructorStandings && constructorStandings.length > 0" class="table-responsive">
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
              <th scope="row">{{ constructor.position || '-' }}</th>
              <td>{{ constructor.Constructor?.name || '-' }}</td>
              <td>{{ constructor.points || '0' }}</td>
              <td>{{ constructor.wins || '0' }}</td>
              <td>{{ constructor.Constructor?.nationality || '-' }}</td>
              <td>
                <a v-if="constructor.Constructor?.url" 
                   :href="constructor.Constructor.url" 
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
        <i class="bi bi-trophy" style="font-size: 3rem;"></i>
        <p class="mt-3">No constructor standings available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'ConstructorStandings',
  data() {
    return {
      constructorStandings: [],
      loading: false,
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getF1ConstructorStandings',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('constructorStandings');
  },
  methods: {
    async getF1ConstructorStandings() {
      if (this.$route.name !== "ConstructorStandings") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getConstructorStandings(yearSlug);
        if (data) {
          this.constructorStandings = data;
        }
      } catch (error) {
        console.error('Error fetching constructor standings:', error);
        if (error.response?.status === 404) {
          this.constructorStandings = [];
        }
      } finally {
        this.loading = false;
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