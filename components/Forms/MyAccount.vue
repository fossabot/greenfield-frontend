<template>
  <div class="mt-2">
    <div class="md:grid grid-cols-2 gap-4 w-full mb-6">
      <form-input
        v-model="form.first_name"
        name="first_name"
        :label="$t('settings.myAccount.account.first_name')"
        :error="form.errors.get('first_name')"
      />

      <form-input
        v-model="form.surname"
        name="surname"
        :label="$t('settings.myAccount.account.surname')"
        :error="form.errors.get('surname')"
      />
    </div>

    <div class="md:grid grid-cols-2 gap-4 w-full mb-6">
      <form-input
        v-model="form.email"
        name="email"
        :label="$t('settings.myAccount.account.emailAddress')"
        :error="form.errors.get('email')"
      />
    </div>

    <form-button
      class="w-full md:w-auto"
      @click.prevent="submit"
      v-text="$t('settings.myAccount.account.update')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form({
        first_name: null,
        surname: null,
        email: null,
      }),
    };
  },

  computed: {
    me() {
      return this.$auth.user;
    },
  },

  mounted() {
    this.setFormData();
  },

  methods: {
    setFormData() {
      this.form = this.$form({
        first_name: this.me.first_name,
        surname: this.me.surname,
        email: this.me.email,
      });
    },

    submit() {
      this.$bus.$emit('loading', true);
      this.form.patch(`${process.env.API_URL}/me`).then(() => {
        this.$bus.$emit('loading', false);
        this.form.errors.clear();
        this.$auth.fetchUser();
        this.$bus.$emit('toast:show', {
          title: 'Updated',
          text: 'Your account has been updated',
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
