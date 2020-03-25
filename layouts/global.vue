<template>
  <div>
    <div
      v-if="loading"
      class="absolute bg-gray-100 w-full h-full z-10 flex justify-center items-center opacity-75"
    >
      <svg
        width="10%"
        height="10%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 0 0"
        xml:space="preserve"
      >
        <circle
          fill="none"
          stroke="#0f7bd4"
          stroke-width="4"
          cx="50"
          cy="50"
          r="44"
          style="opacity:0.5;"
        />
        <circle
          fill="#fff"
          stroke="#0f7bd4"
          stroke-width="3"
          cx="8"
          cy="54"
          r="6"
        >
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />

        </circle>
      </svg>
    </div>
    <slot />
  </div>
</template>

<script>
export default {

  data() {
    return {
      loading: false,
    };
  },

  mounted() {
    this.$bus.$on('loading', (loading) => {
      this.loading = loading;
    });
  },
};
</script>
