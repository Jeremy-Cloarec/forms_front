<script setup>
import RemoveButton from './remove/RemoveButton.vue';
const props = defineProps({
    field: Object
});
</script>

<template>
    <div class="container-textarea field">
        <label>Textarea:</label>
        <textarea v-model="field.value"></textarea>
        <RemoveButton @remove="$emit('remove')" />
    </div>
</template>