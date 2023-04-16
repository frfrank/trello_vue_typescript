<script setup lang="ts">
import { ref } from 'vue'

import type { Option } from '@/types'

import Tag from '@/components/common/Tag.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import SimpleSelect from '@/components/common/SimpleSelect.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import MultiSelect from '@/components/common/MultiSelect.vue'

const options = ref<Option[]>([
  { value: 'Option 1', key: 'option1' },
  { value: 'Option 2', key: 'option2' },
  { value: 'Option 3', key: 'option3' },
  { value: 'Option 4', key: 'option4' },
  { value: 'Option 5', key: 'option5' },
  { value: 'Option 6', key: 'option6' },
  { value: 'Option 7', key: 'option7' },
  { value: 'Option 8', key: 'option8' },
  { value: 'Option 9', key: 'option9' },
  { value: 'Option 10', key: 'option10' },
])
const multiSelectOptions = ref<string[] | number[]>([])
const simpleSelectOption = ref<string | number>('')
const selectOption = ref<string | number>('')
</script>

<template>
  <BaseSelect
    :label="`BaseSelect: ${selectOption}`"
    name="base-select"
    :value="selectOption"
    :options="options"
    @update:value="selectOption = $event"
  />

  <SimpleSelect
    :label="`BaseSelect: ${simpleSelectOption}`"
    name="simple-select"
    :value="simpleSelectOption"
    :options="options"
    @update:value="simpleSelectOption = $event"
  >
    <template #before>
      <Tag type="quaternary">
        <icon icon="fa-solid fa-magnifying-glass" />
      </Tag>
    </template>

    <template #after>
      <BaseButton shape="square">
        <icon icon="fa-solid fa-plus" />
        Añadir
      </BaseButton>
    </template>
  </SimpleSelect>

  <MultiSelect
    :label="`Selecciona varias optiones: ${multiSelectOptions}`"
    name="multi-select"
    placeholder="Elige una opción"
    :value="multiSelectOptions"
    :options="options"
    @update:value="multiSelectOptions = $event"
  >
    <template #before>
      <Tag type="quaternary">
        <icon icon="fa-solid fa-magnifying-glass" />
      </Tag>
    </template>
  </MultiSelect>
</template>

<style scoped lang="scss">
.BaseSelect,
.SimpleSelect,
.MultiSelect {
  margin-bottom: $spacing-m;
}
</style>
