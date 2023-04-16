<template>
  <span :class="classes">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md'].includes(value),
  },
  type: {
    type: String,
    default: 'quaternary',
    validator: (value: string) => ['primary', 'secondary', 'tertiary', 'quaternary'].includes(value),
  },
  shape: {
    type: String,
    default: 'square',
    validator: (value: string) => ['square', 'normal', 'rounded'].includes(value),
  },
  outline: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => {
  const classes = ['Tag']

  if (props.size) {
    classes.push(`size--${props.size}`)
  }

  if (props.type) {
    classes.push(`type--${props.type}`)
  }

  if (props.shape) {
    classes.push(`shape--${props.shape}`)
  }

  if (props.outline) {
    classes.push('outline')
  }

  return classes
})
</script>

<style lang="scss" scoped>
.Tag {
  padding: var(--padding);
  background-color: var(--background);
  color: var(--color);
  font-size: var(--font-size);
  transition: $transition-m;

  &.size {
    &--sm {
      --padding: #{$spacing-2xs} #{$spacing-s};
      --font-size: #{$font-size-s};
    }

    &--md {
      --padding: #{$spacing-xs} #{$spacing-m};
      --font-size: #{$font-size-m};
    }
  }

  &.type {
    &--primary {
      --background: #{$color-primary-lighter};
      --color: #{$color-primary-darkest};
    }

    &--secondary {
      --background: #{$color-secondary-lightest};
      --color: #{$color-secondary};
    }

    &--tertiary {
      --background: #{$color-neutral-light};
      --color: #{$color-neutral-dark};
    }

    &--quaternary {
      --background: #fff;
      --color: #{$color-neutral-dark};
    }
  }

  &.shape {
    &--square {
      border-radius: 0;
    }

    &--normal {
      border-radius: $border-radius-m;
    }

    &--rounded {
      border-radius: $border-radius-xl;
    }
  }

  &.outline {
    &.type {
      &--primary {
        --border-color: #{$color-primary};
      }

      &--secondary {
        --border-color: #{$color-secondary-light};
      }

      &--tertiary {
        --border-color: #{$color-neutral-mid-dark};
      }

      &--quaternary {
        --border-color: #{$color-neutral-mid-dark};
      }
    }

    border: 1px solid var(--border-color);
  }
}
</style>
