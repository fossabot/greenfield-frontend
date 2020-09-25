import qs from 'qs';
import Errors from './Errors';

export default class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor($axios, data, options = {}) {
    this.$axios = $axios;
    this.originalData = data;

    // default for action which can be overwritten
    this.action = '/';

    Object.keys(data).forEach((field) => {
      this[field] = data[field];
    });

    this.options = options;
    this.setDefaultOtions();

    this.errors = new Errors();
  }

  setDefaultOtions() {
    this.defaultOptions = {
      url: false,
      clearOnSuccess: true,
      stringify: false,
    };
  }

  /**
   * Fetch all relevant data for the form.
   */
  data() {
    const data = {};

    Object.keys(this.originalData).forEach((property) => {
      data[property] = this[property];
    });

    return this.options.stringify ? qs.stringify(data) : data;
  }

  /**
   * Reset the form fields.
   */
  reset() {
    Object.keys(this.originalData).forEach((field) => {
      this[field] = '';
    });

    this.errors.clear();
  }

  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} path
   */
  post(path) {
    return this.submit('post', path);
  }

  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} path
   */
  put(path) {
    return this.submit('put', path);
  }

  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} path
   */
  patch(path) {
    return this.submit('patch', path);
  }

  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} path
   */
  delete(path) {
    return this.submit('delete', path);
  }

  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} path
   */
  submit(requestType, path) {
    this.options = { ...this.defaultOptions, ...this.options };

    return new Promise((resolve, reject) => {
      this.$axios[requestType](path, this.data())
        .then((response) => {
          this.onSuccess();
          resolve(response.data);
        })
        .catch((err) => {
          if (typeof err.response !== 'undefined') {
            this.onFail(err.response.data);
          }
          reject(err);
        });
    });
  }

  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess() {
    if (this.options.clearOnSuccess) {
      this.reset();
    }
  }

  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail(responseData) {
    if (typeof responseData.message !== 'undefined') {
      this.errors.recordMessage(responseData.message);
    }

    if (typeof responseData.errors !== 'undefined') {
      this.errors.record(responseData.errors);
    }
  }
}
