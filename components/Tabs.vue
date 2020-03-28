<template>
  <div>
    <div class="sm:flex justify-between">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="cursor-pointer text-center block w-full text-gray-600 font-medium p-4 border-gray-200 hover:text-indigo-500"
        :class="index === selectedTab ? 'border-b-2 border-indigo-500 text-indigo-500': 'border-b'"
        @click="selectTab(index)"
        v-text="tab"
      />
    </div>

    <div class="mt-4 mx-2 sm:mx-0">
      <slot :name="getTabName(tabs[selectedTab])" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      required: true,
      type: Array,
    },
    selected: {
      required: false,
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      selectedTab: 0,
    };
  },

  watch: {
    selected() {
      this.selectedTab = this.selected;
    },
  },

  methods: {
    getTabName(tab) {
      return tab.replace(/ /g, '-').toLowerCase();
    },

    selectTab(index) {
      this.selectedTab = index;
      this.$emit('tabs:selected', this.selectedTab);
    },
  },
};
</script>
