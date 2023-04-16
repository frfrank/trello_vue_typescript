<template>
  <button
    :class="classes"
    type="button"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'tertiary', 'quaternary'].includes(value),
  },
  shape: {
    type: String,
    default: 'normal',
    validator: (value: string) => ['normal', 'square', 'rounded', 'circular'].includes(value),
  },
  light: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const classes = computed(() => {
  const classes = ['BaseButton']

  if (props.size) {
    classes.push(`size--${props.size}`)
  }

  if (props.type) {
    classes.push(`type--${props.type}`)
  }

  if (props.shape) {
    classes.push(`shape--${props.shape}`)
  }

  if (props.light) {
    classes.push('light')
  }

  return classes
})

const emit = defineEmits(['click'])
</script>

<style lang="scss" scoped>
.BaseButton {
  all: unset;
  background-color: var(--background);
  color: var(--color);
  font-size: var(--font-size);
  transition: $transition-m;

  &.size {
    &--sm {
      padding: $spacing-2xs $spacing-s;
      --font-size: #{$font-size-s};
    }

    &--md {
      padding: $spacing-xs $spacing-m;
      --font-size: #{$font-size-m};
    }

    &--lg {
      padding: $spacing-s $spacing-l;
      --font-size: #{$font-size-xl};
    }
  }

  &.type {
    &--primary {
      --background: #{$color-primary};
      --color: #fff;
      --background-hover: #{$color-primary-dark};
      --color-hover: #fff;
    }

    &--secondary {
      --background: #{$color-secondary-light};
      --color: #fff;
      --background-hover: #{$color-secondary};
      --color-hover: #fff;
    }

    &--tertiary {
      --background: #{$color-neutral-mid-light};
      --color: #000;
      --background-hover: #{$color-neutral-mid};
      --color-hover: #000;
    }

    &--quaternary {
      --background: transparent;
      --color: #000;
      --background-hover: transparent;
      --color-hover: #{$color-primary-dark};
      padding: 0 !important;
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

    &--circular {
      border-radius: $border-radius-xl;

      &.size {
        &--sm {
          --spacing: #{$spacing-s};
        }

        &--md {
          --spacing: #{$spacing-m};
        }

        &--lg {
          --spacing: #{$spacing-l};
        }
      }

      aspect-ratio: 1/1;
      position: relative;
      display: grid;
      place-items: center;
      padding: var(--spacing);

      & ::v-deep(*) {
        position: absolute;
      }
    }
  }

  &.light {
    &.type {
      &--primary {
        // --border-color: #{$color-primary-dark};
        --background: #{$color-primary-lighter};
        --color: #{$color-primary-darkest};
        --background-hover: #{$color-primary-light};
        --color-hover: #{$color-primary-darkest};
      }

      &--secondary {
        // --border-color: #{$color-secondary-lighter};
        --background: #{$color-secondary-lightest};
        --color: #{$color-secondary-darker};
        --background-hover: #{$color-secondary-lighter};
        --color-hover: #{$color-secondary-darker};
      }

      &--tertiary {
        // --border-color: #{$color-neutral-mid-dark};

        --background: #fff;
        --color: #000;
        --background-hover: #{$color-neutral-light};
        --color-hover: #000;
      }

      &--quaternary {
        --border-color: #{$color-neutral-mid-dark};
      }
    }

    // border: 2px solid var(--border-color);
  }

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: var(--background-hover);
    color: var(--color-hover);
  }

  &:focus {
    box-shadow: 0 0 2px 1px $color-secondary;
  }

  &:disabled {
    background-color: $color-neutral-dark;
    border-color: $color-neutral-dark;
    cursor: not-allowed;
  }
}
</style>
