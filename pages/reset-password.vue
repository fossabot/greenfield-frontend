<template>
  <div>
    <heading
      :title="$t('resetPassword.title')"
      :intro="$t('resetPassword.intro')"
    />

    <p
      v-if="Object.keys(resetPasswordForm.errors).length"
      class="text-sm mt-1 text-center text-red-500"
      v-text="$t('resetPassword.problem')"
    />

    <FormulateForm
      v-model="resetPasswordForm"
      :errors="resetPasswordForm.errors"
      :schema="schema"
      @submit="submit"
    />
  </div>
</template>

<script>
import resetPasswordSchema from '@/schemas/resetPasswordSchema.js';
import Heading from '~/components/Unauthenticated/Heading.vue';

export default {
  layout: 'unauthenticated-form',

  components: {
    Heading,
  },

  data() {
    return {
      schema: resetPasswordSchema(),
      resetPasswordForm: {
        password: null,
        email: this.$route.query.email,
        token: this.$route.query.token,
        errors: {},
      },
    };
  },

  mounted() {
    this.resetPasswordForm.token = this.$route.query.token;
    this.resetPasswordForm.email = this.$route.query.email;
  },

  methods: {
    submit() {
      this.$bus.$emit('loading', true);

      const credentials = {
        username: this.resetPasswordForm.email,
        password: this.resetPasswordForm.password,
      };

      this.$axios.post(`${process.env.API_URL}/auth/reset-password`, this.resetPasswordForm).then(() => {
        this.$auth.loginWith('oauth2.password', credentials).then(() => {
          this.$router.push({
            path: '/dashboard',
          });
        });
      }).catch((error) => {
        this.$bus.$emit('loading', false);
        this.form.password = null;
        this.resetPasswordForm.errors = error.response.data.errors;
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
