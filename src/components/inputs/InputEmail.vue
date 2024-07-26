<script setup>
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
    componentId: {
        type: String,
        default:''
    }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <label :for="componentId">{{ label }}</label>
    <input :id="componentId" type="email" :value="modelValue" @input="updateValue" :placeholder="placeholder" />
</template>
