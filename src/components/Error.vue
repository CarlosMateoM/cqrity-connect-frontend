<template>
    <p v-if="errors" class="text-red-700 text-sm">{{ errors }}</p>
</template>
<script setup>
    const props = defineProps({
        errors: {
            type: String,
            default: ''
        }
    });
</script>