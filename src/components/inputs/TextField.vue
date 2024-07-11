<template>
    <div class="container-text-field field">
        <label>Text Field:</label>
        <input type="text" v-model="field.value" />
        <RemoveButton @remove="$emit('remove')" />
    </div>
</template>

<script setup>
import RemoveButton from './remove/RemoveButton.vue';
const props = defineProps({
    field: Object
});
</script>