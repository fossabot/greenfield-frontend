<template>
  <input
    :aria-label="label"
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="input-field sm:text-sm sm:leading-5 placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10"
    :class="error ? 'has-error placeholder-red-500' : ''"
    :placeholder="label"
  >
</template>

<script>
  export default {
    props: {
      value: {
        required: false,
        type: String
      },
      label: {
        required: false,
        type: String,
      },
      error: {
        required: false,
        type: [String, Boolean],
      }
    },
  }
</script>

<style scoped>
  .input-field {
    @apply appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900;
  }

  .has-error {
    @apply bg-red-200;
  }
</style>
