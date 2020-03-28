import Form from '~/lib/Form/Form.js';

export default function ({ $axios }, inject) {
  inject('form', (data, options) => new Form($axios, data, options));
}
