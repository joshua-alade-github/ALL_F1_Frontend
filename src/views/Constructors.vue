<template>
  <div class="constructors">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="constructors && constructors.length > 0" class="table-responsive">
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
              <th scope="row">{{ constructor.name || '-' }}</th>
              <td>{{ constructor.nationality || '-' }}</td>
              <td>
                <a v-if="constructor.url" 
                   :href="constructor.url" 
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
        <i class="bi bi-building" style="font-size: 3rem;"></i>
        <p class="mt-3">No constructors available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'Constructors',
  data() {
    return {
      constructors: [],
      loading: false,
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getF1Constructors',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('constructors');
  },
  methods: {
    async getF1Constructors() {
      if (this.$route.name !== "Constructors") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getConstructors(yearSlug);
        if (data) {
          this.constructors = data;
        }
      } catch (error) {
        console.error('Error fetching constructors:', error);
        if (error.response?.status === 404) {
          this.constructors = [];
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