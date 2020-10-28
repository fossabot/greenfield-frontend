<template>
  <div>
    <heading :title="$t('register.title')" />

    <p
      v-if="Object.keys(signupForm.errors).length"
      class="text-sm mt-1 text-center text-red-500"
    >
      {{ $t('register.incorrectemailOrPassword') }}
    </p>

    <FormulateForm
      v-model="signupForm"
      :errors="signupForm.errors"
      :schema="schema"
      @submit="signup"
    />

    <div
      v-if="enableSocialSignup"
      class="text-center font-bold"
    >
      <div>
        {{ $t('register.orRegisterWith') }}
      </div>
      <social-login />
    </div>

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
  </div>
</template>

<script>
import Heading from '~/components/Unauthenticated/Heading.vue';
import signupSchema from "@/schemas/signupSchema.js";
import SocialLogin from '@/components/SocialLogin.vue';

export default {
  layout: 'unauthenticated-form',

  components: {
    Heading,
    SocialLogin,
  },

  data() {
    return {
      enableSocialSignup: process.env.ENABLE_SOCIAL_SIGNUP,
      schema: signupSchema(),
      signupForm: {
        first_name: null,
        surname: null,
        email: null,
        password: null,
        errors: {},
      },
    };
  },

  methods: {
    signup() {
      this.$bus.$emit('loading', true);

      const credentials = {
        username: this.signupForm.email,
        password: this.signupForm.password,
      };

      this.$axios.post(`${process.env.API_URL}/auth/signup`, this.signupForm).then(() => {
        this.$auth.loginWith('oauth2.password', credentials).then(() => {
          this.$bus.$emit('loading', false);
          this.$router.push({
            path: '/dashboard',
          });
        });
      }).catch((error) => {
        this.$bus.$emit('loading', false);
        this.signupForm.errors = error.response.data.errors;
        this.password = null;
      });
    },
  },
};
</script>
