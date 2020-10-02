<template>
  <div class="mb-8">
    <h2
      class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      v-text="title"
    />
    <p
      class="mt-2 text-center text-sm leading-5 text-gray-600"
      v-text="intro"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    intro: {
      type: String,
      required: false,
    },
  },
};
</script>
