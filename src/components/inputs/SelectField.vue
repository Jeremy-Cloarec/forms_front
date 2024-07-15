<script setup>
import { onMounted } from 'vue';
import RemoveButton from './remove/RemoveButton.vue';

const props = defineProps({
    field: Object
});

onMounted(() => {
    if (!props.field.options) {
        props.field.options = ['Option 1', 'Option 2', 'Option 3']; // Définissez des options par défaut ou permettez à l'utilisateur de les configurer
    }
});
</script>

<template>
    <div class="container-select field">
        <label>Select Field:</label>
        <select v-model="field.value">
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
        </select>
        <RemoveButton @remove="$emit('remove')" />
    </div>
</template>