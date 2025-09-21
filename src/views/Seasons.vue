<template>
  <div class="seasons">
    <div class="table-div">
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="seasons && seasons.length > 0" class="table-responsive">
        <table class="table table-hover table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Season</th>
              <th scope="col">Wiki</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="season in seasons" :key="season.season">
              <th scope="row">
                <router-link 
                  v-if="season.season"
                  :to="`/results/${season.season}`"
                  class="text-decoration-none">
                  {{ season.season }}
                </router-link>
                <span v-else>-</span>
              </th>
              <td>
                <a v-if="season.url" 
                   :href="season.url" 
                   target="_blank"
                   class="text-decoration-none">
                  <i class="bi bi-box-arrow-up-right"></i> Wikipedia
                </a>
                <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <nav v-if="pagination && pagination.total_pages > 1" aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click="changePage(currentPage - 1)" href="#">
                Previous
              </a>
            </li>
            <li class="page-item" 
                v-for="page in displayPages" 
                :key="page"
                :class="{ active: page === currentPage }">
              <a class="page-link" @click="changePage(page)" href="#">
                {{ page }}
              </a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === pagination.total_pages }">
              <a class="page-link" @click="changePage(currentPage + 1)" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div v-else-if="!loading" class="empty-state text-center p-5">
        <i class="bi bi-calendar3" style="font-size: 3rem;"></i>
        <p class="mt-3">No seasons available</p>
      </div>
    </div>
  </div>
</template>

<script>
import f1API from '@/utils/api';

export default {
  name: 'Seasons',
  data() {
    return {
      seasons: [],
      pagination: null,
      currentPage: 1,
      perPage: 30,
      loading: false,
    }
  },
  computed: {
    displayPages() {
      if (!this.pagination) return [];
      
      const pages = [];
      const total = this.pagination.total_pages;
      const current = this.currentPage;
      const maxDisplay = 5;
      
      let start = Math.max(1, current - Math.floor(maxDisplay / 2));
      let end = Math.min(total, start + maxDisplay - 1);
      
      if (end - start < maxDisplay - 1) {
        start = Math.max(1, end - maxDisplay + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  },
  mounted() {
    this.getF1Seasons();
  },
  beforeUnmount() {
    f1API.cancelRequest('seasons');
  },
  methods: {
    async getF1Seasons(page = 1) {
      if (this.$route.name !== "Seasons") return;
      
      this.loading = true;
      this.currentPage = page;
      
      try {
        const data = await f1API.getSeasons(page, this.perPage);
        if (data) {
          this.seasons = data.seasons || [];
          this.pagination = data.pagination;
        }
      } catch (error) {
        console.error('Error fetching seasons:', error);
        this.seasons = [];
      } finally {
        this.loading = false;
      }
    },
    
    changePage(page) {
      if (page < 1 || page > this.pagination.total_pages) return;
      this.getF1Seasons(page);
      window.scrollTo(0, 0);
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

.pagination {
  margin-top: 2rem;
  
  .page-link {
    color: #212529;
    cursor: pointer;
    
    &:hover {
      background-color: #e9ecef;
    }
  }
  
  .page-item.active .page-link {
    background-color: #212529;
    border-color: #212529;
  }
  
  .page-item.disabled .page-link {
    cursor: not-allowed;
  }
}
</style>