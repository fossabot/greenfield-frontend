<template>
  <div>
    <heading :title="$t('forgottenPassword.title')" :intro="$t('forgottenPassword.intro')"/>

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
            :error="form.errors.get('email')"
            v-model="form.email"
            type="email"
            name="email"
            :label="$t('forgottenPassword.emailAddress')"/>
        </div>
      </div>

      <p class="text-sm mt-1 text-center text-red-500" v-if="form.errors.get('email')" v-text="form.errors.get('email')" />

      <div class="mt-6 flex items-center justify-start">
        <div class="text-sm leading-5">
          {{$t('forgottenPassword.rememberedIt.title')}}
          <nuxt-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            v-text="$t('forgottenPassword.rememberedIt.signIn')" />
        </div>
      </div>

      <div class="mt-6">
        <button
          @click.prevent="submit"
          type="submit"
          class="signin-button group hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
          v-text="$t('forgottenPassword.submit')"
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
          email: null,
        }),
        error: false,
      };
    },

    methods: {
      submit() {
        this.$bus.$emit('loading', true);

        this.form.post(`${process.env.API_URL}/auth/forgot-password`).then(response => {
          this.$bus.$emit('loading', false);
        }).catch(error => {
          this.$bus.$emit('loading', false);
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
