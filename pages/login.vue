<template>
  <div>
    <heading :title="$t('login.title')"/>

    <form class="mt-8">
      <input
        type="hidden"
        name="remember"
        value="true"
      >
      <div class="rounded-md shadow-sm">
        <form-input
          class="-mt-px rounded-t-md"
          :error="error"
          v-model="form.username"
          type="email"
          name="username"
          :label="$t('login.emailAddress')"/>
        <form-input
          class="-mt-px rounded-b-md"
          :error="error"
          v-model="form.password"
          type="password"
          name-="password"
          :label="$t('login.password')"/>
      </div>

      <p class="text-sm mt-1 text-center text-red-500" v-if="error">
        {{ $t('login.incorrectUsernameOrPassword') }}
      </p>

      <div class="mt-6 flex items-center justify-between flex-col sm:flex-row">
        <div class="text-sm leading-5">
          {{$t('login.dontHaveAnAccount.title')}}
          <nuxt-link to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150" v-text="$t('login.dontHaveAnAccount.signUp')" />
        </div>
        <div class="text-sm leading-5">
          <nuxt-link to="/forgotten-password" class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150" v-text="$t('login.forgotYourPassword')" />
        </div>
      </div>

      <div class="mt-6">
        <button
          @click.prevent="login"
          type="submit"
          class="login-button group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {{ $t('login.signIn') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Heading from '~/components/Unauthenticated/Heading.vue';
import FormInput from "~/components/Form/Input";
export default {
  layout: 'unauthenticated-form',

  components: {
    Heading,
    FormInput,
  },

  data() {
    return {
      form: this.$form({
        username: null,
        password: null,
      }),
      error: false,
    };
  },

  methods: {
    login() {
      this.$bus.$emit('loading', true);
      this.$auth.loginWith('oauth2.password', {
        username: this.form.username,
        password: this.form.password,
      }).then(() => {
        this.$router.push({
          path: '/dashboard',
        });
      }).catch((error) => {
        console.log({error}, '???');
        this.$bus.$emit('loading', false);
        this.error = true;
        this.password = null;
      });
    },
  },
};
</script>

<style scoped>
  .login-button {
    @apply relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 transition duration-150 ease-in-out;
  }

  .input-field {
    @apply appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900;
  }
</style>
