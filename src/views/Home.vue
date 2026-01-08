<template>
  <div class="home">
    <div class="api-status-fixed">
      <span class="badge" :class="apiStatusClass">
        <i class="bi bi-circle-fill me-1"></i>
        {{ apiStatusText }}
      </span>
    </div>

    <div v-if="showWakeupProgress" class="wakeup-modal">
      <div class="wakeup-content">
        <div class="spinner-border text-danger mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h5>Waking up the API...</h5>
        <p class="text-muted mb-3">This may take up to 60 seconds on first load</p>
        <div class="progress">
          <div 
            class="progress-bar progress-bar-striped progress-bar-animated bg-danger" 
            role="progressbar" 
            :style="{ width: wakeupProgress + '%' }"
            :aria-valuenow="wakeupProgress" 
            aria-valuemin="0" 
            aria-valuemax="100">
            {{ Math.round(wakeupProgress) }}%
          </div>
        </div>
        <p class="small text-muted mt-2">
          <i class="bi bi-info-circle"></i> 
          The API server is starting up. This only happens after periods of inactivity.
        </p>
      </div>
    </div>

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
      showWakeupProgress: false,
      wakeupProgress: 0,
      wakeupStartTime: null,
      wakeupProgressInterval: null,
      wakeupTimeout: null,
    }
  },
  computed: {
    apiStatusClass() {
      return {
        'bg-secondary': this.apiStatus === 'checking',
        'bg-success': this.apiStatus === 'healthy',
        'bg-danger': this.apiStatus === 'unhealthy',
        'bg-warning': this.apiStatus === 'waking',
      };
    },
    apiStatusText() {
      switch (this.apiStatus) {
        case 'checking': return 'Checking API...';
        case 'healthy': return 'API Connected';
        case 'unhealthy': return 'API Issues';
        case 'waking': return 'Waking API...';
        default: return 'Unknown';
      }
    }
  },
  mounted() {
    this.checkAPIHealth();
  },
  beforeUnmount() {
    this.clearWakeupTimers();
  },
  methods: {
    async checkAPIHealth() {
      this.apiStatus = 'checking';
      this.wakeupStartTime = Date.now();
      
      try {
        const timeoutPromise = new Promise((resolve) => {
          this.wakeupTimeout = setTimeout(() => {
            this.showWakeupModal();
            resolve('timeout');
          }, 5000);
        });

        const healthPromise = f1API.healthCheck().then(response => {
          clearTimeout(this.wakeupTimeout);
          return response;
        });

        const result = await Promise.race([healthPromise, timeoutPromise]);
        
        if (result !== 'timeout') {
          this.apiStatus = 'healthy';
          this.hideWakeupModal();
        } else {
          await healthPromise;
          this.apiStatus = 'healthy';
          this.hideWakeupModal();
        }
      } catch (error) {
        console.error('API health check failed:', error);
        
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          this.retryHealthCheck();
        } else {
          this.apiStatus = 'unhealthy';
          this.hideWakeupModal();
        }
      }
    },

    async retryHealthCheck(attempt = 1, maxAttempts = 12) {
      if (attempt > maxAttempts) {
        this.apiStatus = 'unhealthy';
        this.hideWakeupModal();
        return;
      }

      try {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await f1API.healthCheck();
        this.apiStatus = 'healthy';
        this.hideWakeupModal();
      } catch (error) {
        this.retryHealthCheck(attempt + 1, maxAttempts);
      }
    },

    showWakeupModal() {
      this.showWakeupProgress = true;
      this.apiStatus = 'waking';
      this.wakeupProgress = 0;
      
      this.wakeupProgressInterval = setInterval(() => {
        const elapsed = Date.now() - this.wakeupStartTime;
        const maxTime = 60000;
        
        const rawProgress = (elapsed / maxTime) * 100;
        this.wakeupProgress = Math.min(95, rawProgress * 0.9 + Math.sqrt(rawProgress) * 5);
        
        if (this.wakeupProgress >= 95) {
          clearInterval(this.wakeupProgressInterval);
        }
      }, 500);
    },

    hideWakeupModal() {
      this.wakeupProgress = 100;
      setTimeout(() => {
        this.showWakeupProgress = false;
        this.clearWakeupTimers();
      }, 500);
    },

    clearWakeupTimers() {
      if (this.wakeupProgressInterval) {
        clearInterval(this.wakeupProgressInterval);
        this.wakeupProgressInterval = null;
      }
      if (this.wakeupTimeout) {
        clearTimeout(this.wakeupTimeout);
        this.wakeupTimeout = null;
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
  
  .api-status-fixed {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 1000;
    
    .badge {
      font-size: 0.85rem;
      padding: 0.5rem 1rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      
      i {
        font-size: 0.6rem;
        animation: pulse 2s infinite;
      }
    }
    
    @media (max-width: 768px) {
      top: 70px;
      right: 10px;
      
      .badge {
        font-size: 0.75rem;
        padding: 0.4rem 0.8rem;
      }
    }
  }
  
  .wakeup-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
  }
  
  .wakeup-content {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
    
    h5 {
      color: #212529;
      margin-bottom: 0.5rem;
    }
    
    .progress {
      height: 25px;
      border-radius: 10px;
      background-color: #e9ecef;
      
      .progress-bar {
        font-weight: bold;
        line-height: 25px;
      }
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
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
    
    .wakeup-content {
      padding: 1.5rem;
      
      h5 {
        font-size: 1.1rem;
      }
    }
  }
</style>