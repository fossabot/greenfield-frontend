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

    <div class="fixed w-full bottom-0 z-10 md:top-0 md:right-0 md:w-6/12 md:mt-16 md:h-0">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
      >
        <div class="bg-white rounded-lg m-4 shadow border-gray-200 border p-4 flex">
          <div
            class="text-xl -mt-1"
            :class="colours[toast.status]"
          >
            <font-awesome-icon :icon="icons[toast.status]" />
          </div>
          <div class="mx-2 w-full text-gray-800">
            <div
              class="font-medium"
              v-text="toast.title"
            />
            <p
              class="text-gray-600"
              v-text="toast.text"
            />
          </div>
          <div class="text-lg text-gray-600">
            <div
              class="cursor-pointer"
              @click="removeToast(index)"
            >
              <font-awesome-icon icon="times" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {

  data() {
    return {
      loading: false,
      icons: {
        success: ['far', 'check-circle'],
        error: ['far', 'times-circle'],
        warning: 'exclamation',
        info: ['far', 'question-circle'],
      },

      colours: {
        success: 'text-green-500',
        error: 'text-red-500',
        warning: 'text-orange-500',
        info: 'text-blue-500',
      },

      toasts: [],
    };
  },

  mounted() {
    this.$bus.$on('loading', (loading) => {
      this.loading = loading;
    });

    this.$bus.$on('toast:show', (data, dismissAfter = 3000) => {
      this.addToast(data, dismissAfter);
    });
  },

  methods: {
    removeToast(toastId) {
      const toastIndex = this.toasts.findIndex((toast) => toast.id === toastId);
      this.toasts.splice(toastIndex, 1);
    },

    addToast(data, dismissAfter = 3000) {
      data.id = uuid();
      this.toasts.push(data);

      if (dismissAfter) {
        setTimeout(() => this.removeToast(data.id), dismissAfter);
      }
    },
  },
};
</script>
