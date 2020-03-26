import Vue from 'vue';

import AppLayout from '~/components/Layouts/App/Default.vue';

const components = {
  AppLayout,
};

Object.keys(components).forEach((key) => Vue.component(key, components[key]));
