<template>
  <div class="home">
    <div class="heading-container">
      <h1 class="display-3">ALL F1</h1>
      <p class="lead">Your Complete Formula 1 Statistics Hub</p>
    </div>
    <div class="container section-container">
      <div class="row g-3">
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/driver-standings/${currentYear}`" class="text-decoration-none">
            <div class="card text-black h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-trophy-fill card-icon"></i>
                <h5 class="mt-2">Driver Standings</h5>
                <p class="card-text small text-muted">Current championship standings</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/constructor-standings/${currentYear}`" class="text-decoration-none">
            <div class="card bg-dark text-white h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-building card-icon"></i>
                <h5 class="mt-2">Constructor Standings</h5>
                <p class="card-text small">Team championship standings</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/results/${currentYear}`" class="text-decoration-none">
            <div class="card text-black h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-flag-fill card-icon"></i>
                <h5 class="mt-2">Results</h5>
                <p class="card-text small text-muted">Race results and winners</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/schedule/${currentYear}`" class="text-decoration-none">
            <div class="card bg-dark text-white h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-calendar3 card-icon"></i>
                <h5 class="mt-2">Schedule</h5>
                <p class="card-text small">Upcoming races and events</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/circuits/${currentYear}`" class="text-decoration-none">
            <div class="card bg-dark text-white h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-geo-alt-fill card-icon"></i>
                <h5 class="mt-2">Circuits</h5>
                <p class="card-text small">Track information and locations</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link to="/seasons" class="text-decoration-none">
            <div class="card text-black h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-clock-history card-icon"></i>
                <h5 class="mt-2">Seasons</h5>
                <p class="card-text small text-muted">Historical F1 seasons</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/drivers/${currentYear}`" class="text-decoration-none">
            <div class="card bg-dark text-white h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-person-fill card-icon"></i>
                <h5 class="mt-2">Drivers</h5>
                <p class="card-text small">Driver profiles and info</p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-6 col-md-3">
          <router-link :to="`/constructors/${currentYear}`" class="text-decoration-none">
            <div class="card text-black h-100 card-hover">
              <div class="card-body text-center">
                <i class="bi bi-tools card-icon"></i>
                <h5 class="mt-2">Constructors</h5>
                <p class="card-text small text-muted">Team information</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      
      <div class="mt-5 text-center">
        <div class="api-status">
          <span class="badge" :class="apiStatusClass">
            <i class="bi bi-circle-fill me-1"></i>
            {{ apiStatusText }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import f1API from '@/utils/api';

export default {
  name: 'Home',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      apiStatus: 'checking', 
    }
  },
  computed: {
    apiStatusClass() {
      return {
        'bg-secondary': this.apiStatus === 'checking',
        'bg-success': this.apiStatus === 'healthy',
        'bg-danger': this.apiStatus === 'unhealthy',
      };
    },
    apiStatusText() {
      switch (this.apiStatus) {
        case 'checking': return 'Checking API Status...';
        case 'healthy': return 'API Connected';
        case 'unhealthy': return 'API Issues Detected';
        default: return 'Unknown Status';
      }
    }
  },
  mounted() {
    this.checkAPIHealth();
  },
  methods: {
    async checkAPIHealth() {
      try {
        await f1API.healthCheck();
        this.apiStatus = 'healthy';
      } catch (error) {
        console.error('API health check failed:', error);
        this.apiStatus = 'unhealthy';
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    background-color: rgb(248, 240, 227);
  }
  
  .heading-container {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    margin: auto;
    max-width: 800px;
    border: 3px solid grey;
    padding: 3rem;
    margin-top: 5%;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    
    h1 {
      font-weight: bold;
      color: #212529;
    }
    
    .lead {
      color: #6c757d;
      margin-top: 1rem;
    }
  }
  
  .section-container {
    padding-top: 5%;
    padding-bottom: 5%;
  }
  
  .card {
    margin: 0;
    border: 3px solid grey;
    transition: all 0.3s ease;
    height: 100%;
    
    &.card-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    
    .card-icon {
      font-size: 2.5rem;
      opacity: 0.8;
    }
    
    .card-body {
      padding: 2rem 1rem;
    }
  }
  
  .api-status {
    display: inline-block;
    
    .badge {
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      
      i {
        font-size: 0.6rem;
        animation: pulse 2s infinite;
      }
    }
  }
  
  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
  
  @media (max-width: 768px) {
    .heading-container {
      margin: 2rem 1rem;
      padding: 2rem 1rem;
      
      h1 {
        font-size: 2rem;
      }
    }
    
    .section-container {
      padding: 2rem 1rem;
    }
  }
</style>