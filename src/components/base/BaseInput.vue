<template>
  <div :class="['BaseInput', `shape--${shape}`]">
    <label
      v-if="label"
      :for="name"
      class="label"
    >
      <span>
        {{ label }}
      </span>
    </label>

    <div class="input">
      <label
        class="before"
        :for="name"
      >
        <slot name="before" />
      </label>

      <input
        :id="name"
        ref="input"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :value="value"
        v-bind="$attrs"
        @input="emit('update:value', ($event.target as HTMLInputElement).value)"
      />

      <div
        v-if="$attrs.disabled"
        class="firefox-disabled-input"
      />

      <span class="after">
        <slot name="after" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  shape: {
    type: String,
    default: 'square',
    validator: (value: string) => ['square', 'rounded'].includes(value),
  },
})

const emit = defineEmits(['update:value'])
</script>

<style lang="scss" scoped>
.BaseInput {
  display: grid;
  gap: $spacing-xs;

  &.shape {
    &--rounded {
      --border-radius: #{$border-radius-xl};
      --spacing: #{$spacing-m};
    }

    &--square {
      --border-radius: #{$border-radius-m};
      --spacing: #{$spacing-s};
    }
  }

  .label {
    font-weight: 600;
  }

  .input {
    display: flex;
    border: 1px solid $color-neutral-mid;
    border-radius: var(--border-radius);
    overflow: hidden;
    background-color: #fff;
    box-shadow: $shadow-xs;
    position: relative;

    &:has(input:focus) {
      border-color: $color-primary;
    }

    .before,
    .after {
      display: grid;
      place-items: center;
    }

    .after:not(:empty) {
      border-left: 1px solid $color-neutral-mid;
    }

    .before:not(:empty) {
      border-right: 1px solid $color-neutral-mid;
    }

    input {
      all: unset;
      flex: 1;
      padding: $spacing-xs $spacing-m;
      background-color: #fff0;
    }

    .firefox-disabled-input {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      opacity: 0;
    }
  }
}
</style>
