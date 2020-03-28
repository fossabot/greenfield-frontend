<template>
  <app-layout>
    <template v-slot:title>
      {{ $t('settings.title') }}
    </template>

    <template v-slot:content>
      <tabs
        :tabs="tabs.map(tab => tab.title)"
        :selected="tab"
        @tabs:selected="tabsUpdated"
      >
        <template v-slot:my-account>
          <h3
            class="font-medium text-lg"
            v-text="$t('settings.myAccount.title')"
          />

          <my-account-form />

          <hr class="my-6">

          <h3
            class="font-medium text-lg"
            v-text="$t('settings.myAccount.password.title')"
          />

          <password-form />
        </template>
      </tabs>
    </template>
  </app-layout>
</template>

<script>
import Tabs from '~/components/Tabs.vue';
import MyAccountForm from '~/components/Forms/MyAccount';
import PasswordForm from '~/components/Forms/Password';

export default {
  components: {
    Tabs,
    MyAccountForm,
    PasswordForm,
  },

  data() {
    return {
      passwordForm: this.$form({
        current_password: null,
        password: null,
      }),
      tab: 0,
      tabs: [
        {
          title: 'My Account',
          slug: 'my-account',
        },
      ],
    };
  },

  mounted() {
    if (this.$route.params.tab) {
      this.tab = this.tabs.findIndex((tab) => tab.slug === this.$route.params.tab);
    }
  },

  methods: {
    tabsUpdated(tabIndex) {
      this.$router.push({
        params: {
          tab: this.tabs[tabIndex].slug,
        },
      });
    },
  },
};
</script>
