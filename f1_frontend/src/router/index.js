import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DriverStandings from '../views/DriverStandings.vue'
import ConstructorStandings from '../views/ConstructorStandings.vue'
import Drivers from '../views/Drivers.vue'
import Constructors from '../views/Constructors.vue'
import Circuits from '../views/Circuits.vue'
import Seasons from '../views/Seasons.vue'
import Results from '../views/Results.vue'
import RaceResults from '../views/RaceResults.vue'
import QualifyingResults from '../views/QualifyingResults.vue'
import Schedule from '../views/Schedule.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/driver-standings/:year_slug',
    name: 'DriverStandings',
    component: DriverStandings
  },
  {
    path: '/constructor-standings/:year_slug',
    name: 'ConstructorStandings',
    component: ConstructorStandings
  },
  {
    path: '/drivers/:year_slug',
    name: 'Drivers',
    component: Drivers
  },
  {
    path: '/constructors/:year_slug',
    name: 'Constructors',
    component: Constructors
  },
  {
    path: '/circuits/:year_slug',
    name: 'Circuits',
    component: Circuits
  },
  {
    path: '/seasons',
    name: 'Seasons',
    component: Seasons
  },
  {
    path: '/qualifying/:year_slug/:round_slug',
    name: 'QualifyingResults',
    component: QualifyingResults
  },
  {
    path: '/results/:year_slug/:round_slug',
    name: 'RaceResults',
    component: RaceResults
  },
  {
    path: '/results/:year_slug',
    name: 'Results',
    component: Results
  },
  {
    path: '/schedule/:year_slug',
    name: 'Schedule',
    component: Schedule
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
