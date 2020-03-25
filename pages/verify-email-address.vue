<template>
  <div></div>
</template>

<script>
  export default {
    layout: 'unauthenticated-form',
    mounted() {
      this.$emit('loading', true);
      this.$axios.post(`${process.env.API_URL}/verify-email`, this.$route.query).then(() => {
          this.$auth.fetchUser().then(() => {
            this.$router.push({
              path: '/dashboard',
            });
        }, 500);
      }).catch(() => {
        this.$router.push({
          path: '/email-not-verified'
        });
      });
    }

  }
</script>
