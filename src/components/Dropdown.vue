<template>
  <select class="form-select selectpicker" v-model="selectedYear" @change="handleChange" id='date-dropdown'>
    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
  </select>
</template>

<script>
import { debounce } from '@/utils/debounce';

export default {
  name: "Dropdown",
  data() {
    return {
      selectedYear: '',
      years: []
    }
  },
  watch: {
    '$route.params.year_slug': {
      handler(newYear) {
        if (newYear && newYear !== this.selectedYear) {
          this.selectedYear = newYear;
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.generateYears();
    this.selectedYear = this.$route.params.year_slug || new Date().getFullYear().toString();
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      const earliestYear = 1950;
      this.years = [];
      
      for (let year = currentYear; year >= earliestYear; year--) {
        this.years.push(year.toString());
      }
    },
    
    handleChange: debounce(function() {
      this.changeRoute();
    }, 300),
    
    changeRoute() {
      if (this.selectedYear && this.selectedYear !== this.$route.params.year_slug) {
        this.$router.push({ 
          name: this.$route.name, 
          params: { year_slug: this.selectedYear }
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