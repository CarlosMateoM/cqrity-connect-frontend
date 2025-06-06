<template>
    <div>
        <label :for="name" class="block">
            {{ label }}
        </label>

        <input :id="id" :type="type" :name="name" v-model="model" @blur="emits('blur')" @change="emits('change')"
            @focus="emits('focus')" :placeholder="placeholder" :readonly="isReadonly"
            class="w-full p-2 border text-gray-800 border-gray-300 rounded-lg outline-0" />

        <Error :errors="props.errors" />
    </div>
</template>
<script setup> 
import Error from './Error.vue';

    const emits = defineEmits(['blur', 'change', 'focus']);

    const model = defineModel();

    const props = defineProps({
        label: {
            type: String,
        },
        type: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        errors: {
            type: String,
        },
        isReadonly: {
            type: Boolean,
            default: false
        }
    });

</script>