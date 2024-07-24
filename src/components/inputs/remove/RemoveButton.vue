<template>
    <button @click="handleClick">Supprimer le champ</button>
</template>

<script setup>
const emit = defineEmits(['remove']);

const handleClick = () => {
    emit('remove');
};
</script>

<style scoped>
button {
    width: fit-content;
    align-self: center;
    margin-top: 1rem;
}
</style>