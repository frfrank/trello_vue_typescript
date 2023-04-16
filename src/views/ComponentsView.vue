<script lang="ts" setup>
import Tabs from '@/components/common/Tabs.vue'
import Choices from '@/documentation/Choices.vue'
import Selects from '@/documentation/Selects.vue'
import Modal from '@/documentation/Modal.vue'
import Tags from '@/documentation/Tags.vue'
import Texts from '@/documentation/Texts.vue'
import Inputs from '@/documentation/Inputs.vue'
import Buttons from '@/documentation/Buttons.vue'

import { ref } from 'vue'

import type { Option } from '@/types'

const tabs = ref<Option[]>([
  { value: 'Choices', key: 'choices' },
  { value: 'Selects', key: 'selects' },
  { value: 'Modal', key: 'modal' },
  { value: 'Tags', key: 'tags' },
  { value: 'Texts', key: 'texts' },
  { value: 'Inputs', key: 'inputs' },
  { value: 'Buttons', key: 'buttons' },
])

const components: Record<string, any> = {
  choices: Choices,
  selects: Selects,
  modal: Modal,
  tags: Tags,
  texts: Texts,
  inputs: Inputs,
  buttons: Buttons,
}

const currentTab = ref('choices')
</script>

<template>
  <div class="ComponentsView">
    <Tabs
      :options="tabs"
      :value="currentTab"
      @tab-clicked="currentTab = $event"
    />

    <div class="tabs-content">
      <component :is="components[currentTab]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ComponentsView {
  padding: $spacing-s;

  .tabs-content {
    padding: $spacing-s;
    // background-color: #fff;
    // border: 1px solid $color-neutral-mid-dark;
  }
}
</style>
