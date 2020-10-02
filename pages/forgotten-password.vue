<template>
  <div>
    <heading
      :title="$t('forgottenPassword.title')"
      :intro="$t('forgottenPassword.intro')"
    />

    <FormulateForm
      v-model="forgottenPasswordForm"
      :errors="forgottenPasswordForm.errors"
      :schema="schema"
      @submit="submit"
    />

    <div class="mt-6 flex items-center justify-start">
      <div class="text-sm leading-5">
        {{ $t('forgottenPassword.rememberedIt.title') }}
        <nuxt-link
          to="/login"
          class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          v-text="$t('forgottenPassword.rememberedIt.signIn')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import forgotPasswordSchema from '@/schemas/forgotPasswordSchema.js';
import Heading from '~/components/Unauthenticated/Heading.vue';

export default {
  layout: 'unauthenticated-form',

  components: {
    Heading,
  },

  data() {
    return {
      schema: forgotPasswordSchema(),
      forgottenPasswordForm: {
        email: null,
        errors: {},
      },
    };
  },

  methods: {
    submit() {
      this.$bus.$emit('loading', true);

      this.$axios.post(`${process.env.API_URL}/auth/forgot-password`, this.forgottenPasswordForm).then((response) => {
        this.$bus.$emit('loading', false);
      }).catch((error) => {
        this.$bus.$emit('loading', false);
        this.forgottenPasswordForm.errors = error.response.data.errors;
      });
    },
  },
};
</script>
