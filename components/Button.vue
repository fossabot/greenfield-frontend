<template>
  <button
    @click="$emit('click', $event)"
    class="relative flex justify-center py-2 px-4 border
  border-transparent text-sm leading-5 font-medium rounded-md
  text-white bg-indigo-600 group hover:bg-indigo-500 focus:outline-none
  focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
  >
    <slot />
  </button>
</template>
