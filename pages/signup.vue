<template>
  <div>
    <heading :title="$t('register.title')" />

    <form class="mt-8">
      <input
        type="hidden"
        name="remember"
        value="true"
      >
      <div class="rounded-md shadow-sm">
        <div>
          <placeholder-input
            v-model="form.first_name"
            class="rounded-t-md"
            :error="form.errors.get('first_name')"
            name="first_name"
            :label="$t('register.firstName')"
          />
          <placeholder-input
            v-model="form.surname"
            class="-mt-px"
            :error="form.errors.get('surname')"
            name="surname"
            :label="$t('register.surname')"
          />
          <placeholder-input
            v-model="form.email"
            class="-mt-px"
            :error="form.errors.get('email')"
            type="email"
            name="email"
            :label="$t('register.emailAddress')"
          />
          <placeholder-input
            v-model="form.password"
            class="-mt-px rounded-b-md"
            :error="form.errors.get('password')"
            type="password"
            name-="password"
            :label="$t('register.password')"
          />
        </div>
      </div>

      <p
        v-if="error"
        class="text-sm mt-1 text-center text-red-500"
      >
        {{ $t('register.incorrectemailOrPassword') }}
      </p>

      <div class="mt-6 flex items-center justify-start">
        <div class="text-sm leading-5">
          {{ $t('register.alreadyHaveAnAccount.title') }}
          <nuxt-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            v-text="$t('register.alreadyHaveAnAccount.signIn')"
          />
        </div>
      </div>

      <div class="mt-6">
        <form-button
          type="submit"
          class="w-full"
          @click.prevent="signup"
          v-text="$t('register.signUp')"
        />
      </div>
    </form>
  </div>
</template>

<script>
import Heading from '~/components/Unauthenticated/Heading.vue';

export default {
  layout: 'unauthenticated-form',

  components: {
    Heading,
  },

  data() {
    return {
      form: this.$form({
        first_name: null,
        surname: null,
        email: null,
        password: null,
      }),
      error: false,
    };
  },

  methods: {
    signup() {
      this.$bus.$emit('loading', true);

      const credentials = {
        username: this.form.email,
        password: this.form.password,
      };

      this.form.post(`${process.env.API_URL}/auth/signup`).then((response) => {
        this.$auth.loginWith('oauth2.password', credentials).then(() => {
          this.$bus.$emit('loading', false);
          this.$router.push({
            path: '/dashboard',
          });
        });
        console.log('cool', { response });
      }).catch((error) => {
        this.$bus.$emit('loading', false);
        this.error = true;
        this.password = null;
      });
    },
  },
};
</script>

