import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='http://localhost:3000/api/v1/' 

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['x-access-token'] = `${ token }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
