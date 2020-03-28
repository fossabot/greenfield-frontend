<template>
  <div>
    <heading
      :title="$t('forgottenPassword.title')"
      :intro="$t('forgottenPassword.intro')"
    />

    <form class="mt-8">
      <input
        type="hidden"
        name="remember"
        value="true"
      >
      <div class="rounded-md shadow-sm">
        <div>
          <placeholder-input
            v-model="form.email"
            class="rounded-md"
            :error="form.errors.get('email')"
            type="email"
            name="email"
            :label="$t('forgottenPassword.emailAddress')"
          />
        </div>
      </div>

      <p
        v-if="form.errors.get('email')"
        class="text-sm mt-1 text-center text-red-500"
        v-text="form.errors.get('email')"
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

      <div class="mt-6">
        <form-button
          type="submit"
          class="w-full"
          @click.prevent="submit"
          v-text="$t('forgottenPassword.submit')"
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
        email: null,
      }),
      error: false,
    };
  },

  methods: {
    submit() {
      this.$bus.$emit('loading', true);

      this.form.post(`${process.env.API_URL}/auth/forgot-password`).then((response) => {
        this.$bus.$emit('loading', false);
      }).catch((error) => {
        this.$bus.$emit('loading', false);
      });
    },
  },
};
</script>

