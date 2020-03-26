<template>
  <app-layout>
    <template v-slot:title>
      {{ $t('settings.title') }}
    </template>

    <template v-slot:content>
      <tabs
        :tabs="tabs.map(tab => tab.title)"
        :selected="tab"
        v-on:tabs:selected="tabsUpdated"
      >
        <template v-slot:my-account>
          My Account
        </template>

        <template v-slot:company>
          Company
        </template>

        <template v-slot:team-members>
          Team Members
        </template>

        <template v-slot:billing>
          Billing
        </template>
      </tabs>
    </template>
  </app-layout>
</template>

<script>
import Tabs from '~/components/Tabs.vue';

export default {
  components: {
    Tabs,
  },

  data() {
    return {
      tab: 0,
      tabs: [
        {
          title: 'My Account',
          slug: 'my-account',
        },
        {
          title: 'Company',
          slug: 'company',
        },
        {
          title: 'Team Members',
          slug: 'team-members',
        },
        {
          title: 'Billing',
          slug: 'billing',
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
