<script lang="ts" setup>
import type { Option } from '@/types'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: Array as () => Option[],
    required: true,
  },
})

const emit = defineEmits(['update:value'])

const innerValue: Ref<string | number> = ref(props.value)
watch(innerValue, (value) => {
  emit('update:value', value)
})
</script>

<template>
  <fieldset class="RadioChoices">
    <legend
      v-if="label"
      :for="name"
      class="label"
    >
      {{ label }}
    </legend>

    <div
      v-for="(option, i) in options"
      :key="i"
      class="choice-block"
    >
      <div class="choice">
        <input
          :id="`${name}${i}`"
          v-model="innerValue"
          :name="name"
          type="radio"
          :value="option.key"
        />

        <label :for="`${name}${i}`">
          <span>{{ option.value }}</span>
        </label>
      </div>
    </div>
  </fieldset>
</template>

<style lang="scss" scoped>
.RadioChoices {
  all: unset;
  display: grid;
  gap: $spacing-2xs;

  legend {
    display: none;
  }

  .choice {
    label {
      padding: $spacing-2xs;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: $spacing-xs;
      border-radius: $border-radius-xl;

      &:hover {
        cursor: pointer;
        border-color: $color-primary;
        color: $color-primary-dark;

        &:before {
          background-color: $color-primary;
          box-shadow: inset 0 0 0 3px #fff;
        }
      }

      &:before {
        content: '';
        background: #fff;
        border: 1px solid $color-neutral-mid-dark;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        transition: $transition-m;
      }
    }

    input {
      height: 0;
      width: 0;
      position: absolute;
      opacity: 0;

      &:checked + label {
        color: $color-primary-darker;

        &:before {
          border-color: $color-primary-light;
          background-color: $color-primary;
          box-shadow: inset 0 0 0 2px #fff;
        }
      }

      &:focus + label {
        box-shadow: 0 0 0px 1px $color-primary;
      }
    }
  }
}
</style>
