<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

// const componentId = computed(() => {
//     return props.componentId.replace(/\s+/g, '-').toLowerCase();
// });

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <label :for="componentId">{{ label }}</label>
    <input :id="componentId" type="text" :value="modelValue" @input="updateValue" :placeholder="placeholder" />
</template>
