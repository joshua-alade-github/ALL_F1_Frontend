<template>
  <div class="home">
    <div class="heading-container">
      <h1>ALL F1</h1>
    </div>
    <div class="container section-container">
        <div class="row">
          <div class="col-sm">
            <router-link to="/driver-standings/2021" class="text-decoration-none">
              <div class="card text-black">
                <div class="card-body">
                  <h4>Driver Standings</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-sm">
            <router-link to="/constructor-standings/2021" class="text-decoration-none">
              <div class="card bg-dark text-white">
                <div class="card-body">
                  <h4>Constructor Standings</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-sm">
            <router-link to="/results/2021" class="text-decoration-none">
              <div class="card text-black">
                <div class="card-body">
                  <h4>Results</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-sm">
            <router-link to="/schedule/2021" class="text-decoration-none">
              <div class="card bg-dark text-white">
                <div class="card-body">
                  <h4>Schedule</h4>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <router-link to="/circuits/2021" class="text-decoration-none">
              <div class="card bg-dark text-white">
                <div class="card-body">
                  <h4>Circuits</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-sm">
            <router-link to="/seasons" class="text-decoration-none">
              <div class="card text-black">
                <div class="card-body">
                  <h4>Seasons</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-sm">
            <router-link to="/drivers/2021" class="text-decoration-none">
              <div class="card bg-dark text-white">
                <div class="card-body">
                  <h4>Drivers</h4>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-sm">
            <router-link to="/constructors/2021" class="text-decoration-none">
              <div class="card text-black">
                <div class="card-body">
                  <h4>Constructors</h4>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>

<style lang="scss">
  body {
    background-color: rgb(248, 240, 227);
  }
  .heading-container {
    background-color: rgb(255, 255, 255);
    margin: auto;
    width: 50%;
    border: 3px solid grey;
    padding: 50px;
    margin-top: 5%;
    text-align: center;
  }
  .section-container {
    padding-top: 5%;
  }
  .card {
    margin: 10px;
    border: 3px solid grey;
  }
</style>
