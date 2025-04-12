<template>
  <div>
    <label for="category">Select Category:</label>
    <select id="category" @change="handleCategoryChange">
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    categories: Array,
  },
  methods: {
    handleCategoryChange(event: Event) {
      const category = (event.target as HTMLSelectElement).value;
      this.$emit("category-selected", category);
    },
  }
};
</script>
