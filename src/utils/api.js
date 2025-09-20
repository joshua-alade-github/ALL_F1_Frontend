import axios from 'axios';
import store from '@/store';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://morning-thicket-80526.onrender.com/',
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    store.dispatch('startLoading');
    return config;
  },
  error => {
    store.dispatch('stopLoading');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    store.dispatch('stopLoading');
    
    if (response.data && response.data.error) {
      store.dispatch('showError', response.data.message || 'An error occurred');
      return Promise.reject(new Error(response.data.message));
    }
    
    return response.data.data || response.data;
  },
  error => {
    store.dispatch('stopLoading');
    
    if (error.response) {
      if (error.response.status === 404) {
        store.dispatch('showError', 'Data not found');
      } else if (error.response.status >= 500) {
        store.dispatch('showError', 'Server error. Please try again later.');
      } else {
        store.dispatch('showError', error.response.data?.message || 'An error occurred');
      }
    } else if (error.request) {
      store.dispatch('showError', 'Network error. Please check your connection.');
    } else {
      store.dispatch('showError', error.message || 'An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

class F1API {
  constructor() {
    this.cancelTokens = new Map();
  }

  cancelRequest(key) {
    if (this.cancelTokens.has(key)) {
      this.cancelTokens.get(key).cancel('Request cancelled');
      this.cancelTokens.delete(key);
    }
  }

  async makeRequest(key, url) {
    this.cancelRequest(key);
    
    const source = axios.CancelToken.source();
    this.cancelTokens.set(key, source);
    
    try {
      const response = await api.get(url, { cancelToken: source.token });
      this.cancelTokens.delete(key);
      return response;
    } catch (error) {
      if (!axios.isCancel(error)) {
        throw error;
      }
      return null;
    }
  }

  // API methods
  getDriverStandings(year) {
    return this.makeRequest('driverStandings', `/api/driver-standings/${year}/`);
  }

  getConstructorStandings(year) {
    return this.makeRequest('constructorStandings', `/api/constructor-standings/${year}/`);
  }

  getDrivers(year) {
    return this.makeRequest('drivers', `/api/drivers/${year}/`);
  }

  getConstructors(year) {
    return this.makeRequest('constructors', `/api/constructors/${year}/`);
  }

  getCircuits(year) {
    return this.makeRequest('circuits', `/api/circuits/${year}/`);
  }

  getSeasons(page = 1, perPage = 30) {
    return this.makeRequest('seasons', `/api/seasons/?page=${page}&per_page=${perPage}`);
  }

  getResults(year) {
    return this.makeRequest('results', `/api/results/${year}/`);
  }

  getResultsRound(year, round) {
    return this.makeRequest('resultsRound', `/api/results/${year}/${round}/`);
  }

  getQualifyingResults(year, round) {
    return this.makeRequest('qualifying', `/api/qualifying/${year}/${round}/`);
  }

  getSchedule(year) {
    return this.makeRequest('schedule', `/api/schedule/${year}/`);
  }

  clearCache() {
    return api.post('/api/clear-cache/');
  }

  healthCheck() {
    return api.get('/api/health/');
  }
}

export default new F1API();