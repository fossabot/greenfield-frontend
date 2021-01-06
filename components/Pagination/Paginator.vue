<template>
  <div>
    <div
      v-if="paginatedResponse.meta"
      class="bg-white overflow-hidden shadow sm:rounded-lg p-2"
    >
      <slot />

      <div class="bg-white mt-2 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <component
            :is="previousLink.url === null ? 'span' : 'a'"
            class="relative inline-flex items-center px-4 py-2 border
              border-gray-300 text-sm font-medium rounded-md text-gray-700
              bg-white"
            :disabled="previousLink.url === null"
            :class="{
              'hover:bg-gray-200': previousLink.url,
            }"
            @click.prevent="$emit('pagination:navigate', previousLink.url)"
          >
            {{ previousLink.label }}
          </component>
          <component
            :is="nextLink.url === null ? 'span' : 'a'"
            href="#"
            class="ml-3 relative inline-flex items-center px-4 py-2 border
              border-gray-300 text-sm font-medium rounded-md text-gray-700
              bg-white"
            :disabled="nextLink.url === null"
            :class="{
              'hover:bg-gray-200': nextLink.url,
            }"
            @click.prevent="$emit('pagination:navigate', nextLink.url)"
          >
            {{ nextLink.label }}
          </component>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div v-if="paginatedResponse.meta">
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ paginatedResponse.meta.from }}</span>
              to
              <span class="font-medium">{{ paginatedResponse.meta.to }}</span>
              of
              <span class="font-medium">{{ paginatedResponse.meta.total }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <component
                :is="paginationLink.url === null ? 'span' : 'a'"
                v-for="(paginationLink, paginationLinkIndex) in paginatedResponse.meta.links"
                href="#"
                class="relative inline-flex items-center px-4 py-2 border
                  border-gray-300 bg-white text-sm font-medium text-gray-700"
                :class="{
                  'rounded-l-md': paginationLinkIndex === 0,
                  'rounded-r-md': paginationLinkIndex === (paginatedResponse.meta.links.length - 1),
                  'hover:bg-gray-200': paginationLink.url,
                  'bg-gray-200': paginationLink.active,
                }"
                :disabled="paginationLink.url === null"
                @click.prevent="$emit('pagination:navigate', paginationLink.url)"
              >
                <template v-if="paginationLinkIndex === 0">
                  <span class="sr-only">{{ paginationLink.label }}</span>
                  <svg
                    class="h-5 w-5"
                    x-description="Heroicon name: chevron-left"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>

                <template v-else-if="paginationLinkIndex === paginatedResponse.meta.links.length - 1">
                  <span class="sr-only">{{ paginationLink.label }}</span>
                  <svg
                    class="h-5 w-5"
                    x-description="Heroicon name: chevron-right"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </template>

                <template v-else>
                  {{ paginationLink.label }}
                </template>
              </component>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paginatedResponse: {
      type: Object,
      required: true,
    },
  },

  computed: {
    nextLink() {
      if (this.paginatedResponse.meta) {
        return this.paginatedResponse.meta.links[this.paginatedResponse.meta.links.length - 1];
      }

      return {};
    },

    previousLink() {
      if (this.paginatedResponse.meta) {
        return this.paginatedResponse.meta.links[0];
      }

      return {};
    },
  },
};
</script>
