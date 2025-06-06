<template>
    <div class="flex justify-between my-4">


        <div class="flex items-center">
            <p>
                Página {{ meta?.current_page }} de {{  meta?.last_page }}
            </p>
        </div>

        <div class="flex gap-4">
            <button type="button" @click="() => emits('prev', links?.prev)" :disabled="!links?.prev"
                class="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed">
                <IconArrowLeft class="size-6 mr-2" stroke="1.25" />
                Anterior
            </button>
            <button type="button" @click="() => emits('next', links?.next)" :disabled="!links?.next"
                class="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed">
                Siguiente
                <IconArrowRight class="size-6 ml-2" stroke="1.25" />
            </button>
        </div>
    </div>
</template>
<script setup>
    import { IconArrowLeft, IconArrowRight } from '@tabler/icons-vue';

    const emits = defineEmits(['prev', 'next', 'change'])
    
    const model = defineModel();

    const props = defineProps({
        meta: {
            type: Object,
            required: true
        },
        links: {
            type: Object,
            required: true
        }
    })
</script>