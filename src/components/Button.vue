<template>
    <button :disabled="isSubmitting" :class="buttonClass">
        <slot />
        {{ text }}
        <div v-if="isSubmitting" class="size-4 border border-t-transparent rounded-full mr-1 animate-spin" />
    </button>
</template>
<script setup>

    import { computed } from 'vue';

    const props = defineProps({
        isSubmitting: Boolean,
        text: {
            type: String,
            default: 'Guardar'
        },
        variant: {
            type: String,
            default: 'primary',
            validator: (value) => ['primary', 'secondary'].includes(value)
        }
    });

    const buttonClass = computed(() => {
        return props.variant === 'secondary'
            ? "flex flex-row bg-primary hover:bg-primary-200 text-gray-700 px-4 py-2 rounded-lg"
            : "flex items-center gap-2 bg-primary text-gray-50 px-4 py-2 rounded-lg hover:bg-primary/80";
    });
</script>