<template>
  <div>
    <heading :title="$t('emailNotVerified.title')" :intro="$t('emailNotVerified.intro')"/>

    <div class="mt-6">
      <button
        @click.prevent="submit"
        type="submit"
        class="signin-button group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
        v-text="$t('emailNotVerified.submit')"
      />
    </div>
  </div>
</template>

<script>
  import Heading from '~/components/Unauthenticated/Heading.vue';
  import FormInput from "~/components/Form/Input";
  export default {
    layout: 'unauthenticated-form',
    middleware: ['auth'],

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

        this.$axios.post(`${process.env.API_URL}/verify-email/resend-verification`).then(response => {
          if(response.data.resent) {
            this.$bus.$emit('loading', false);
          }
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
