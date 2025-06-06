<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
<script setup>
  import AppLayout from '@/layouts/AppLayout.vue';
  import { RouterView, useRoute } from 'vue-router';
  import { computed } from 'vue';

  const route = useRoute();

  const layouts = {
    AppLayout,
  }

  const layout = computed(() => {
    return layouts[route.meta.layout] || 'div';
  });

</script>