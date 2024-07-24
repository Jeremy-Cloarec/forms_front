<template>
    <div>
        <label :for="componentId">{{ placeholder }}</label>
        <textarea :id="componentId" :value="modelValue" @input="updateValue"></textarea>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const componentId = computed(() => {
    return props.placeholder.replace(/\s+/g, '-').toLowerCase();
});

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>