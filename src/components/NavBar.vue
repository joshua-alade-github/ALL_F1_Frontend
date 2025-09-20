<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <i class="bi bi-speedometer2 me-2"></i>ALL F1
      </router-link>
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleMenu"
        :aria-expanded="isMenuOpen">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" :class="{ show: isMenuOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link 
              :to="`/driver-standings/${currentYear}`" 
              class="nav-link" 
              @click="closeMenu"
              :class="{ active: $route.name === 'DriverStandings' }">
              Driver Standings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              :to="`/constructor-standings/${currentYear}`" 
              class="nav-link" 
              @click="closeMenu"
              :class="{ active: $route.name === 'ConstructorStandings' }">
              Constructor Standings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              :to="`/results/${currentYear}`" 
              class="nav-link" 
              @click="closeMenu"
              :class="{ active: $route.name === 'Results' }">
              Results
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              :to="`/schedule/${currentYear}`" 
              class="nav-link" 
              @click="closeMenu"
              :class="{ active: $route.name === 'Schedule' }">
              Schedule
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" 
               href="#" 
               id="navbarDropdown" 
               role="button" 
               @click.prevent="toggleDropdown">
              More
            </a>
            <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
              <li>
                <router-link 
                  :to="`/circuits/${currentYear}`" 
                  class="dropdown-item" 
                  @click="closeMenu">
                  <i class="bi bi-geo-alt me-2"></i>Circuits
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/seasons" 
                  class="dropdown-item" 
                  @click="closeMenu">
                  <i class="bi bi-clock-history me-2"></i>Seasons
                </router-link>
              </li>
              <li>
                <router-link 
                  :to="`/drivers/${currentYear}`" 
                  class="dropdown-item" 
                  @click="closeMenu">
                  <i class="bi bi-person me-2"></i>Drivers
                </router-link>
              </li>
              <li>
                <router-link 
                  :to="`/constructors/${currentYear}`" 
                  class="dropdown-item" 
                  @click="closeMenu">
                  <i class="bi bi-tools me-2"></i>Constructors
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      isMenuOpen: false,
      isDropdownOpen: false,
    }
  },
  watch: {
    $route() {
      this.closeMenu();
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (!this.isMenuOpen) {
        this.isDropdownOpen = false;
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
      this.isDropdownOpen = false;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  
  .navbar-brand {
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  .nav-link {
    cursor: pointer;
    transition: color 0.3s;
    
    &.active {
      color: #fff !important;
      font-weight: 500;
    }
    
    &:hover {
      color: #fff !important;
    }
  }
  
  .dropdown-menu {
    margin-top: 0.5rem;
    border: none;
    box-shadow: 0 4px 6px rgba(0,0,0,.1);
    
    .dropdown-item {
      padding: 0.5rem 1rem;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #f8f9fa;
      }
      
      i {
        width: 20px;
      }
    }
  }
}

@media (max-width: 991px) {
  .navbar-collapse {
    margin-top: 1rem;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    padding-left: 1rem;
  }
}
</style>