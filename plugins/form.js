import Form from '~/lib/Form/Form.js';

export default function ({$axios}, inject) {
  inject('form', data => new Form($axios, data));
};
