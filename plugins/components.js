import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTimes,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AppLayout from '~/components/Layouts/App/Default.vue';


library.add([
  faTimes,
  faExclamation,
  faCheckCircle,
  faQuestionCircle,
  faTimesCircle,
]);

const components = {
  AppLayout,
  FontAwesomeIcon,
};

Object.keys(components).forEach((key) => Vue.component(key, components[key]));
