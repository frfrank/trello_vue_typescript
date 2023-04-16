<template>
  <div class="LoginView">LoginView</div>
  <BaseButton @click="$router.push({ name: 'home' })"> Login </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<style lang="scss" scoped></style>
