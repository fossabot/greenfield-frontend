import axios from 'axios';

const DEFAULTS = {
  token_type: 'Bearer',
  response_type: 'token',
  tokenName: 'Authorization'
};

export default class Oauth2PasswordScheme {
  constructor (auth, options) {
    this.$auth = auth;
    this.name = options._name;

    this.options = Object.assign({}, DEFAULTS, options)
  }

  async mounted () {
    // Sync token
    const token = this.$auth.syncToken(this.name);

    // Set axios token
    if (token) {
      this._setToken(token)
    }

    return this.$auth.fetchUserOnce()
  }

  _setToken (token) {
    // Set Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, token)
  }

  _clearToken () {
    // Clear Authorization token for all axios requests
    this.$auth.ctx.app.$axios.setHeader(this.options.tokenName, false)
  }

  async logout () {
    this._clearToken();
    return this.$auth.reset()
  }

  async login (credentials) {
    if (!this.options.endpoints.login) {
      return;
    }

    await this.logout();

    return new Promise((resolve, reject) => {
      axios.post(this.options.endpoints.login, credentials).then(response => {
        const token = `Bearer ${response.data.access_token}`;
        this.$auth.setToken(this.name, token);
        this._setToken(token);

        if (response.data.refresh_token) {
          const refreshToken = this.options.token_type + ' ' + response.data.refresh_token;
          this.$auth.setRefreshToken(this.name, refreshToken);
        }

        resolve(this.fetchUser());
      }).catch((error) => {
        reject(error);
      });
    });
  }

  async fetchUser () {
    if (!this.$auth.getToken(this.name)) {
      return;
    }

    if (!this.options.endpoints.me) {
      this.$auth.setUser({});
      return;
    }

    const user = await this.$auth.requestWith(this.name, {
      url: this.options.endpoints.me,
    });

    this.$auth.setUser(user.data);
  }
}
