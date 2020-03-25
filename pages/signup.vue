<template>
  <div>
    <heading :title="$t('register.title')"/>

    <form class="mt-8">
      <input
        type="hidden"
        name="remember"
        value="true"
      >
      <div class="rounded-md shadow-sm">
        <div>
          <form-input
            class="rounded-t-md"
            :error="form.errors.get('first_name')"
            v-model="form.first_name"
            name="first_name"
            :label="$t('register.firstName')"/>
          <form-input
            class="-mt-px"
            :error="form.errors.get('surname')"
            v-model="form.surname"
            name="surname"
            :label="$t('register.surname')"/>
          <form-input
            class="-mt-px"
            :error="form.errors.get('email')"
            v-model="form.email"
            type="email"
            name="email" :label="$t('register.emailAddress')"/>
          <form-input
            class="-mt-px rounded-b-md"
            :error="form.errors.get('password')"
            v-model="form.password"
            type="password"
            name-="password" :label="$t('register.password')"/>
        </div>
      </div>

      <p class="text-sm mt-1 text-center text-red-500" v-if="error">
        {{ $t('register.incorrectemailOrPassword') }}
      </p>

      <div class="mt-6 flex items-center justify-start">
        <div class="text-sm leading-5">
          {{$t('register.alreadyHaveAnAccount.title')}}
          <nuxt-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            v-text="$t('register.alreadyHaveAnAccount.signIn')" />
        </div>
      </div>

      <div class="mt-6">
        <button
          @click.prevent="signup"
          type="submit"
          class="signin-button group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          v-text="$t('register.signUp')"
        />
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
            this.$router.push({
              path: '/dashboard',
            });
          });
          console.log('cool', {response});
        }).catch((error) => {
          this.$bus.$emit('loading', false);
          this.error = true;
          this.password = null;
        });
      },
    },
  };
</script>

<style scoped>
  .signin-button {
    @apply relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 transition duration-150 ease-in-out;
  }
</style>
