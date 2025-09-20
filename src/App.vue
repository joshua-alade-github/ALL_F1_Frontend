<template>
  <div>
    <NavBar v-if="this.$route.path !== '/'" />
    
    <div v-if="$store.state.errorVisible" class="alert alert-danger alert-dismissible fade show m-3" role="alert">
      <strong>Error!</strong> {{ $store.state.errorMessage }}
      <button type="button" class="btn-close" @click="$store.commit('clearError')"></button>
    </div>
    
    <div class="loading-container" v-if="$store.getters.isLoading">
      <div class="loading-bar">
        <div class="loading-bar-progress"></div>
      </div>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  },
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap';
  @import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
  
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 15px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  body { 
    padding-top: 70px;
  }
  
  .table-div {
    padding: 2% 5%;
    
    @media (max-width: 768px) {
      padding: 2%;
    }
  }
  
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    @media (max-width: 768px) {
      margin: 0 -1rem;
      padding: 0 1rem;
    }
  }
  
  .table {
    border: 3px solid grey;
    min-width: 600px;
  }
  
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.9);
  }
  
  .loading-bar {
    height: 4px;
    background: #f0f0f0;
    overflow: hidden;
  }
  
  .loading-bar-progress {
    height: 100%;
    background: linear-gradient(90deg, #e10600, #ff1e00);
    animation: loading 1.5s ease-in-out infinite;
  }
  
  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }
  
  .alert {
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9998;
    max-width: 500px;
    width: 90%;
  }
  
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
  
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  .skeleton-text {
    height: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    @extend .skeleton;
  }
  
  .skeleton-row {
    height: 3rem;
    margin-bottom: 0.5rem;
    @extend .skeleton;
  }
</style>