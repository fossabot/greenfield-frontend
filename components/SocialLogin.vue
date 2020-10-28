<template>
  <div class="flex justify-center">
    <div
      v-for="(provider, key) in socialProviders"
      :key="key"
      :class="provider.cssClass"
      class="w-12 h-12 m-4 text-2xl flex justify-center items-center rounded-lg cursor-pointer hover:opacity-75"
    >
      <font-awesome-icon :icon="provider.icon" />
    </div>
    <!--          <pre>{{ socialProviders }}</pre>-->
  </div>
</template>

<script>
import EnabledSocialAuthProviders from '@/config/enabledSocialAuthProviders';

export default {
  data() {
    return {
      socialProviders: EnabledSocialAuthProviders,
    };
  },
};
</script>

<style lang="scss">
.login-with-apple {
  background: #000000;
  color: #ffffff;
}

.login-with-facebook {
  background: #3b5998;
  color: #ffffff;
}

.login-with-google {
  background: #f2f2f2;
  color: #4285F4;
}

</style>
