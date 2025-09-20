<template>
  <div class="schedule">
    <div class="table-div">
      <Dropdown />
      
      <div v-if="loading" class="skeleton-loader">
        <div class="skeleton-row" v-for="i in 10" :key="i"></div>
      </div>
      
      <div v-else-if="schedule && schedule.length > 0" class="table-responsive">
        <table class="table table-hover table-striped table-light">
          <thead>
            <tr>
              <th scope="col">Round</th>
              <th scope="col">Circuit</th>
              <th scope="col">Race Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col">Wiki</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="race in schedule" 
                :key="race.round"
                :class="{ 'table-active': isNextRace(race) }">
              <th scope="row">{{ race.round || '-' }}</th>
              <td>{{ race.Circuit?.circuitName || '-' }}</td>
              <td>
                <strong>{{ race.raceName || '-' }}</strong>
                <span v-if="isNextRace(race)" class="badge bg-danger ms-2">NEXT</span>
              </td>
              <td>{{ formatDate(race.date) || '-' }}</td>
              <td>{{ formatTime(race.time) || '-' }}</td>
              <td>
                <span v-if="isPastRace(race.date)" class="badge bg-success">
                  Completed
                </span>
                <span v-else-if="isTodayRace(race.date)" class="badge bg-warning">
                  Today
                </span>
                <span v-else class="badge bg-secondary">
                  Upcoming
                </span>
              </td>
              <td>
                <a v-if="race.url" 
                   :href="race.url" 
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
        <i class="bi bi-calendar3" style="font-size: 3rem;"></i>
        <p class="mt-3">No schedule available for this year</p>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../components/Dropdown.vue';
import f1API from '@/utils/api';

export default {
  components: { Dropdown },
  name: 'Schedule',
  data() {
    return {
      schedule: [],
      loading: false,
      nextRaceIndex: -1,
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler: 'getF1Schedule',
      immediate: true
    }
  },
  beforeUnmount() {
    f1API.cancelRequest('schedule');
  },
  methods: {
    async getF1Schedule() {
      if (this.$route.name !== "Schedule") return;
      
      this.loading = true;
      const yearSlug = this.$route.params.year_slug;
      
      try {
        const data = await f1API.getSchedule(yearSlug);
        if (data) {
          this.schedule = data;
          this.findNextRace();
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        if (error.response?.status === 404) {
          this.schedule = [];
        }
      } finally {
        this.loading = false;
      }
    },
    
    findNextRace() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for (let i = 0; i < this.schedule.length; i++) {
        const raceDate = new Date(this.schedule[i].date);
        if (raceDate >= today) {
          this.nextRaceIndex = i;
          break;
        }
      }
    },
    
    isNextRace(race) {
      const index = this.schedule.indexOf(race);
      return index === this.nextRaceIndex;
    },
    
    isPastRace(date) {
      if (!date) return false;
      const raceDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return raceDate < today;
    },
    
    isTodayRace(date) {
      if (!date) return false;
      const raceDate = new Date(date);
      const today = new Date();
      return raceDate.toDateString() === today.toDateString();
    },
    
    formatDate(date) {
      if (!date) return null;
      try {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
      } catch {
        return date;
      }
    },
    
    formatTime(time) {
      if (!time) return null;
      try {
        // Remove the 'Z' and format as local time
        const [hours, minutes] = time.replace('Z', '').split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      } catch {
        return time;
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

.table-active {
  background-color: rgba(225, 6, 0, 0.05);
}

.badge {
  font-size: 0.7rem;
}
</style>