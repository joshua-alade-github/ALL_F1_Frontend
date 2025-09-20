<template>
  <div class="error-page">
    <div class="error-content">
      <i class="bi bi-exclamation-triangle-fill error-icon"></i>
      <h1>Oops! Page not found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <router-link :to="{name: 'Home'}" class="btn btn-primary">
        <i class="bi bi-house-fill"></i> Go Home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  mounted() {
    this.$store.commit('decrementLoading');
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 2rem;
}

.error-content {
  text-align: center;
  max-width: 500px;
  
  .error-icon {
    font-size: 5rem;
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  h1 {
    margin-bottom: 1rem;
    color: #212529;
  }
  
  p {
    color: #6c757d;
    margin-bottom: 2rem;
  }
}
</style>