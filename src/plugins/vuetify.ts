import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);
const vuetify = new Vuetify();
vuetify.preset.breakpoint.thresholds = {
  xs: 600,
  sm: 960,
  md: 1280,
  lg: 1920,
};

export default vuetify;
