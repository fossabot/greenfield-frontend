<template>
  <div>
    <heading :title="$t('login.title')" />

    <div class="mt-8">
      <p
        v-if="Object.keys(loginForm.errors).length"
        class="text-sm mt-1 text-center text-red-500"
      >
        {{ $t('login.incorrectUsernameOrPassword') }}
      </p>

      <FormulateForm
        v-model="loginForm"
        :errors="loginForm.errors"
        :schema="schema"
        @submit="login"
      />

      <div
        v-if="enableSocialLogin"
        class="text-center font-bold"
      >
        <div>
          {{ $t('login.orLoginWith') }}
        </div>
        <social-login />
      </div>

      <div class="mt-6 flex items-center justify-between flex-col sm:flex-row">
        <div class="text-sm leading-5">
          {{ $t('login.dontHaveAnAccount.title') }}
          <nuxt-link
            to="/signup"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            v-text="$t('login.dontHaveAnAccount.signUp')"
          />
        </div>
        <div class="text-sm leading-5">
          <nuxt-link
            to="/forgotten-password"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            v-text="$t('login.forgotYourPassword')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from '~/components/Unauthenticated/Heading.vue';
import LoginSchema from '~/schemas/loginSchema.js';
import SocialLogin from '~/components/SocialLogin.vue';

export default {
  layout: 'unauthenticated-form',

  components: {
    Heading,
    SocialLogin,
  },

  data() {
    return {
      enableSocialLogin: process.env.ENABLE_SOCIAL_LOGIN,
      loginForm: {
        email: null,
        password: null,
        errors: {},
      },
      error: false,
      schema: LoginSchema(),
    };
  },

  methods: {
    login() {
      this.$bus.$emit('loading', true);
      this.$auth.loginWith('oauth2.password', {
        username: this.loginForm.email,
        password: this.loginForm.password,
      }).then(() => {
        this.$bus.$emit('loading', false);
        this.$router.push({
          path: '/dashboard',
        });
      }).catch((error) => {
        this.$bus.$emit('loading', false);
        this.loginForm.errors = error.response.data.errors;
        this.password = null;
      });
    },
  },
};
</script>
