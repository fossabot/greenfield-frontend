<template>
  <div class="mt-2">
    <FormulateForm
      v-model="myAccountForm"
      :errors="myAccountForm.errors"
      :schema="schema"
      @submit="submit"
    />
  </div>
</template>

<script>
import myAccountSchema from '@/schemas/myAccountSchema.js';

export default {
  data() {
    return {
      schema: myAccountSchema(),
      myAccountForm: {
        first_name: null,
        surname: null,
        email: null,
        errors: {},
      },
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
      this.myAccountForm = {
        first_name: this.me.first_name,
        surname: this.me.surname,
        email: this.me.email,
        errors: {},
      };
    },

    submit() {
      this.$bus.$emit('loading', true);
      this.$axios.patch(`${process.env.API_URL}/me`, this.myAccountForm).then(() => {
        this.$bus.$emit('loading', false);
        this.myAccountForm.errors = {};
        this.$auth.fetchUser();
        this.$bus.$emit('toast:show', {
          title: 'Updated',
          text: 'Your account has been updated',
          status: 'success',
        });
      }).catch((error) => {
        this.myAccountForm.errors = error.response.data.errors;
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
