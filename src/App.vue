<template>
  <RouterView />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import { useHead } from '@unhead/vue';
  import Aos from 'aos';

  interface RouteMeta {
    title: string;
  }

  export default defineComponent({
    name: 'MainApp',
    components: { RouterView },
    watch: {
      $route: async function () {
        const route = this.$route;
        const title = (route.meta as RouteMeta)?.title || 'Default Title';
        useHead({ title });
      }
    },
    async mounted() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          Aos.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
          });
        });
      } else {
        Aos.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true
        });
      }
    },
  });
</script>

<style scoped>
body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>
