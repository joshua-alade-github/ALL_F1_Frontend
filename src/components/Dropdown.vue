<template>
  <select class="form-select selectpicker" v-model="year" @change="handleChange" id='date-dropdown'></select>
</template>

<script>
import { debounce } from '@/utils/debounce';

export default {
  name: "Dropdown",
  data() {
    return {
      year: ''
    }
  },
  mounted() {
    this.getYears();
    this.year = this.$route.params.year_slug || new Date().getFullYear();
  },
  methods: {
    getYears() {
      let dateDropdown = document.getElementById('date-dropdown'); 
      let currentYear = new Date().getFullYear();    
      let earliestYear = 1950;
      
      while (currentYear >= earliestYear) {      
        let dateOption = document.createElement('option');          
        dateOption.text = currentYear;      
        dateOption.value = currentYear;        
        dateDropdown.add(dateOption);      
        currentYear -= 1;    
      }
    },
    
    handleChange: debounce(function() {
      this.changeRoute();
    }, 300),
    
    changeRoute() {
      if (this.year && this.year !== this.$route.params.year_slug) {
        this.$router.push({ 
          name: this.$route.name, 
          params: { year_slug: this.year }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .selectpicker {
    background-color: rgb(123, 124, 126);
    color: white;
    border-color: #999;
    margin-bottom: 5px;
    width: auto;
    min-width: 100px;
    
    @media (max-width: 768px) {
      width: 100%;
    }
  }
</style>