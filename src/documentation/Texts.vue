<script setup lang="ts">
import BaseText from '@/components/base/BaseText.vue'
import Tag from '@/components/common/Tag.vue'
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <BaseText
    v-model:value="value"
    label="Escribe un texto de máximo 10 caracteres"
    name="text-1"
    :chars-limit="10"
    :rows="5"
  />

  <BaseText
    v-model:value="value"
    label="Escribe un texto de máximo 2 palabras"
    name="text-2"
    :words-limit="2"
  >
    <template #before>
      <Tag>
        <icon icon="fa-solid fa-user-secret" />
      </Tag>
    </template>

    <template #after>
      <Tag>
        <icon icon="fa-solid fa-user-secret" />
      </Tag>
    </template>
  </BaseText>
</template>
