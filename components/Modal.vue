<template>
  <div
    class="w-screen h-screen bg-red-100 absolute top-0 left-0 z-10 bg-indigo-600 bg-opacity-25"
  >
    <div
      class="w-full h-full flex justify-center overflow-scroll fixed"
      @click="$nuxt.$emit('modal:hide')"
    >
      <div
        class="absolute rounded bg-white w-full sm:w-1/2 my-12 p-4"
        @click.stop
      >
        <span
          class="absolute top-0 right-0 px-2 cursor-pointer text-gray-500"
          @click="$nuxt.$emit('modal:hide')"
        >
          <font-awesome-icon icon="times"/>
        </span>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('keyup', this.closeOnEscape);
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.closeOnEscape);
  },

  methods: {
    closeOnEscape(event) {
      if (event.key === 'Escape') {
        this.$nuxt.$emit('modal:hide');
      }
    },
  },
};
</script>
