<script setup lang="ts">
import { ref } from 'vue'

import RadioChoice from '@/components/common/RadioChoices.vue'
import MultiChoice from '@/components/common/MultiChoices.vue'
import type { Option } from '@/types'

const options = ref<Option[]>([
  { value: 'Option 1', key: 'option1' },
  { value: 'Option 2', key: 'option2' },
  { value: 'Option 3', key: 'option3' },
  { value: 'Option 4', key: 'option4' },
])

const choice = ref<string | number>('')
const choices = ref<(string | number)[]>([])
</script>

<template>
  <p><b>Elige una o varias opciones: </b>{{ choices }}</p>

  <MultiChoice
    :options="options"
    :value="choices"
    name="multi-choice"
    @update:value="choices = $event"
  />

  <p><b>Elige una opcion: </b>{{ choice }}</p>

  <RadioChoice
    :options="options"
    :value="choice"
    name="simple-choice"
    @update:value="choice = $event"
  />
</template>
