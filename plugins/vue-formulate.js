import Vue from 'vue';
import VueFormulate from '@braid/vue-formulate';

Vue.use(VueFormulate, {
  classes: {
    outer: 'mb-4',
    input(context) {
      switch (context.classification) {
        case 'button':
          return 'relative flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700';
        default:
          let classList = 'rounded-md border-2 border-gray-300 w-full p-2';

          if (context.hasErrors) {
            classList += ' border-red-500';
          }

          return classList;
      }
    },
    label: 'block my-1 text-md font-medium text-gray-900',
    help: 'text-xs mb-1 text-gray-600',
    error: 'text-red-700 text-xs my-1',
  },
});
