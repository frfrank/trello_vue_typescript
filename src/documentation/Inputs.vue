<script setup lang="ts">
import { ref } from 'vue'

import Tag from '@/components/common/Tag.vue'
import BaseInput from '@/components/base/BaseInput.vue'

const value = ref<string>('')
</script>

<template>
  <BaseInput
    v-model:value="value"
    :label="$t('TESTING')"
    name="input-1"
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
  </BaseInput>

  <BaseInput
    v-model:value="value"
    :label="$t('TESTING')"
    name="input-2"
  >
    <template #before>
      <Tag>
        {{ $t('TESTING') }}
      </Tag>
    </template>
  </BaseInput>

  <BaseInput
    v-model:value="value"
    :label="$t('TESTING')"
    name="input-3"
  />

  <BaseInput
    v-model:value="value"
    :label="$t('TESTING')"
    name="input-4"
    shape="rounded"
  />
</template>

<style lang="scss" scoped>
.BaseInput {
  margin-bottom: $spacing-m;
}
</style>
