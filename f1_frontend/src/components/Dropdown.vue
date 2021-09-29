<template>
  <select class="form-select selectpicker" v-model="year" @change="changeRoute" id='date-dropdown'></select>
</template>

<script>

export default {
  name: "Dropdown",
  mounted() {
    this.getYears()
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
    changeRoute() {
      this.$router.push({ 
          name: this.$route.name, 
          params: {
                    year_slug: this.year
                  }
          })
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
    width: 10%;
  }
</style>