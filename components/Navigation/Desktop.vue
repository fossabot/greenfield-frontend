<template>
  <div class="ml-10 flex items-baseline">
    <nuxt-link
      v-for="menuItem in menuItems"
      class="menu-item hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      :to="menuItem.path"
      v-text="menuItem.title"
    />
  </div>
</template>

<script>
export default {
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.menu-item {
  @apply ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300;
}

.menu-item.nuxt-link-active {
  @apply text-white bg-gray-900;
}
</style>
