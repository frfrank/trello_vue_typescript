<script setup lang="ts">
import { defineProps, defineEmits, ref, type Ref } from 'vue'
import type { Option } from '@/types'

const props = defineProps({
  options: {
    type: Array as () => Option[],
    required: true,
  },
  value: {
    type: [String, Number],
    default: undefined,
  },
})

const innerValue: Ref<string | number> = ref(props.value ?? '')
const emit = defineEmits(['tab-clicked'])

function selectTab(key: string | number): void {
  innerValue.value = key
  emit('tab-clicked', key)
}
</script>

<template>
  <div class="Tabs">
    <button
      v-for="option in options"
      :key="option.key"
      :class="{ active: innerValue === option.key }"
      @click="selectTab(option.key)"
    >
      {{ option.value }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.Tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  button {
    all: unset;
    padding: $spacing-xs $spacing-s;
    border-bottom: 1px solid $color-neutral-mid-dark;
    border-radius: $border-radius-m $border-radius-m 0 0;
    color: $color-neutral-dark;
    position: relative;
    transition: $transition-m;

    &:hover {
      cursor: pointer;
      color: $color-secondary-light;
      box-shadow: inset 0 -1px 0 0 $color-secondary-lighter;
    }

    &.active {
      color: $color-secondary;
      border-color: $color-secondary;
      box-shadow: inset 0 -1px 0 0 $color-secondary;
    }
  }
}
</style>
