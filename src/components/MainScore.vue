<script setup>
import { useScore } from '@/composables/useScore';
        const {score} = useScore()
</script>

<template>
    <span class="text-white font-bold">Main Score: {{ score }}</span>
</template>

