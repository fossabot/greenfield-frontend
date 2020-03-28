<template>
  <div>
    <label
      :for="name"
      class="block my-1 text-md font-medium text-gray-900"
      v-text="label"
    />
    <input
      :id="name"
      :aria-label="label"
      :value="value"
      :class="error ? 'has-error placeholder-red-500' : ''"
      class="rounded-md border-2 border-gray-300 w-full p-2 outline-none"
      :name="name"
      v-bind="$attrs"
      :type="type"
      @input="$emit('input', $event.target.value)"
    >
    <p
      v-if="error"
      class="text-red-500 text-sm mt-1"
      v-text="error"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      type: String,
    },
    label: {
      required: false,
      type: String,
    },
    name: {
      required: false,
      type: String,
    },
    type: {
      required: false,
      type: String,
      default: 'text',
    },
    error: {
      required: false,
      type: [String, Boolean],
    },
  },
};
</script>

<style scoped>
  .input-field {
    @apply appearance-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900;
  }

  .has-error {
    @apply bg-red-100 border-red-500;
  }
</style>
