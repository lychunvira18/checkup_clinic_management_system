import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#22a7f0',
          secondary: '#e4f1fe',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    },
    icons: {
      iconfont: 'fa',
    },
});
