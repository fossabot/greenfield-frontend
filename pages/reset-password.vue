<template>
  <div>
    <heading :title="$t('resetPassword.title')" :intro="$t('resetPassword.intro')"/>

    <form class="mt-8">
      <input
        type="hidden"
        name="remember"
        value="true"
      >
      <div class="rounded-md shadow-sm">
        <div>
          <form-input
            class="rounded-md"
            :error="form.errors.get('password')"
            v-model="form.password"
            type="password"
            name="password"
            :label="$t('resetPassword.password')"/>
        </div>
      </div>

      <p class="text-sm mt-1 text-center text-red-500" v-if="error" v-text="$t('resetPassword.problem')" />

      <div class="mt-6">
        <button
          @click.prevent="submit"
          type="submit"
          class="signin-button group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          v-text="$t('resetPassword.resetPassword')"
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
          password: null,
          email: this.$route.query.email,
          token: this.$route.query.token,
        }),
        error: false,
      };
    },

    mounted() {
      this.form.token = this.$route.query.token;
      this.form.email = this.$route.query.email;
    },

    methods: {
      submit() {
        this.$bus.$emit('loading', true);

        const credentials = {
          username: this.form.email,
          password: this.form.password,
        };

        this.form.post(`${process.env.API_URL}/auth/reset-password`).then(response => {
          this.$auth.loginWith('oauth2.password', credentials).then(() => {
            this.$router.push({
              path: '/dashboard',
            });
          });
        }).catch(error => {
          this.$bus.$emit('loading', false);
          this.form.password = null;
          this.error = true;
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
