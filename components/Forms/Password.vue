<template>
  <div class="mt-2">
    <FormulateForm
      :key="formKey"
      v-model="accountPasswordForm"
      :errors="accountPasswordForm.errors"
      :schema="schema"
      @submit="submit"
    />
  </div>
</template>

<script>
import accountPasswordSchema from "@/schemas/accountPasswordSchema.js";

export default {
  data() {
    return {
      formKey: Math.floor(Math.random() * 100),
      schema: accountPasswordSchema(),
      accountPasswordForm: {
        current_password: null,
        password: null,
        errors: {},
      },
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
      this.$axios.put(`${process.env.API_URL}/password`, this.accountPasswordForm).then(() => {
        this.$bus.$emit('loading', false);
        this.accountPasswordForm = {
          current_password: null,
          password: null,
          errors: {},
        };
        this.$auth.fetchUser();
        this.$bus.$emit('toast:show', {
          title: 'Updated',
          text: 'Your password has been updated',
          status: 'success',
        });
        this.formKey = Math.floor(Math.random() * 100);
      }).catch((error) => {
        this.accountPasswordForm.errors = error.response.data.errors;
        this.$bus.$emit('loading', false);
        this.$bus.$emit('toast:show', {
          title: 'Oops',
          text: error.response.data.message,
          status: 'error',
        }, true);
      });
    },
  },
};
</script>
