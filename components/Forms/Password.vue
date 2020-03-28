<template>
  <div class="mt-2">
    <div class="md:grid grid-cols-2 gap-4 w-full mb-6">
      <form-input
        v-model="form.current_password"
        name="current_password"
        type="password"
        :label="$t('settings.myAccount.password.current_password')"
        :error="form.errors.get('current_password')"
      />

      <form-input
        v-model="form.password"
        name="password"
        type="password"
        :label="$t('settings.myAccount.password.password')"
        :error="form.errors.get('password')"
      />
    </div>

    <form-button
      class="w-full md:w-auto"
      @click.prevent="submit"
      v-text="$t('settings.myAccount.password.update')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form({
        current_password: null,
        password: null,
      }, { clearOnSuccess: true }),
    };
  },

  computed: {
    me() {
      return this.$auth.user;
    },
  },

  methods: {
    submit() {
      this.$bus.$emit('loading', true);
      this.form.put(`${process.env.API_URL}/password`).then(() => {
        this.$bus.$emit('loading', false);
        this.form.errors.clear();
        this.$auth.fetchUser();
        this.$bus.$emit('toast:show', {
          title: 'Updated',
          text: 'Your password has been updated',
          status: 'success',
        });
      }).catch((error) => {
        this.$bus.$emit('loading', false);
        this.$bus.$emit('toast:show', {
          title: 'Oops',
          text: error.response.data.message,
          status: 'error',
        }, false);
      });
    },
  },
};
</script>
