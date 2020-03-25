<template>
  <global>
    <div @click="windowClick">
      <nav
        class="bg-gray-800"
        @keydown.escape="menuOpen = false"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <nuxt-link to="/">
                  <img
                    class="h-8 w-8"
                    src="/images/logo.svg"
                    alt=""
                  >
                </nuxt-link>
              </div>
              <div class="hidden md:block">
                <desktop-navigation :menu-items="menuItems" />
              </div>
            </div>
              <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                <div class="relative">
                  <button
                    class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                  @click.stop="notificationsOpen = !notificationsOpen">
                    <svg
                      class="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>

                  <div class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg" v-if="notificationsOpen">
                    <div class="rounded-md bg-white shadow-xs">
                      <div class="py-1">
                        <div class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                          Notification
                        </div>
                      </div>
                      <div class="border-t border-gray-100"></div>
                    </div>
                  </div>

                </div>

                <div class="ml-3 relative">
                  <div>
                    <button
                      class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      @click.stop="menuOpen = !menuOpen"
                    >
                      <img
                        class="h-8 w-8 rounded-full"
                        :src="me.avatar_url"
                        alt="`${me.first_name} ${me.surname}`"
                      >
                    </button>
                  </div>

                  <div
                    v-if="menuOpen"
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                  >
                    <div class="py-1 rounded-md bg-white shadow-xs">
                      <component
                        v-for="(accountMenuItem, index) in accountMenuItems"
                        :key="index"
                        :to="accountMenuItem.path"
                        @click.prevent="accountMenuItem.action ? accountMenuItem.action() : null"
                        class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        v-text="accountMenuItem.title"
                        :is="accountMenuItem.action ? 'a' : 'nuxt-link'"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <button
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                @click.stop="menuOpen = !menuOpen"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    :class="{
                    hidden: menuOpen,
                    'inline-flex': !menuOpen
                  }"
                    class="inline-flex"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    :class="{
                    hidden: !menuOpen,
                    'inline-flex': menuOpen
                  }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          :class="{ block: menuOpen, hidden: !menuOpen }"
          class="md:hidden"
        >
          <mobile-navigation :menu-items="menuItems" />
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  :src="me.avatar_url"
                  alt="`${me.first_name} ${me.surname}`"
                >
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white" v-text="`${me.first_name} ${me.surname}`" />
                <div class="mt-1 text-sm font-medium leading-none text-gray-400" v-text="me.email" />
              </div>
            </div>
            <div class="mt-3 px-2">
              <component
                v-for="(accountMenuItem, index) in accountMenuItems"
                :key="index"
                :to="accountMenuItem.path"
                @click.prevent="accountMenuItem.action ? accountMenuItem.action() : null"
                class="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                v-text="accountMenuItem.title"
                :is="accountMenuItem.action ? 'a' : 'nuxt-link'"
              />
            </div>
          </div>
        </div>
      </nav>
      <nuxt />
    </div>
  </global>
</template>

<script>
import Global from './global.vue';
import DesktopNavigation from '~/components/Navigation/Desktop.vue';
import MobileNavigation from '~/components/Navigation/Mobile.vue';

export default {
  middleware: ['auth', 'verified_email'],
  components: {
    Global,
    DesktopNavigation,
    MobileNavigation,
  },

  data() {
    return {
      menuItems: [
        {
          title: 'Dashboard',
          path: '/dashboard',
        },
      ],

      accountMenuItems: [
        {
          title: 'Your Profile',
          path: '/profile',
        },
        {
          title: 'Settings',
          path: '/settings',
        },
        {
          title: 'Sign out',
          path: '#',
          action: this.signout,
        },
      ],
      menuOpen: false,
      notificationsOpen: false,
    };
  },

  computed: {
    me() {
      return this.$auth.user;
    }
  },

  methods: {
    signout() {
      this.$auth.logout();
      this.$router.push({
        path: '/',
      });
    },

    windowClick(event) {
      if (this.menuOpen || this.notificationsOpen) {
        this.menuOpen = false;
        this.notificationsOpen = false;
        event.preventDefault();
      }
    },
  },
};
</script>
