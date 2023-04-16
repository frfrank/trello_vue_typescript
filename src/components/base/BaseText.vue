<template>
  <div class="BaseText">
    <label
      :for="name"
      class="label"
    >
      <span v-if="label">
        {{ label }}
      </span>
    </label>

    <div class="text">
      <label
        class="before"
        :for="name"
      >
        <slot name="before" />
      </label>

      <textarea
        :id="name"
        ref="text"
        v-model="innerValue"
        :name="name"
        :placeholder="placeholder"
        :rows="rows"
      />

      <span class="after">
        <slot name="after" />
      </span>
    </div>

    <span
      v-if="charsLimit >= 0"
      class="chars-limit"
    >
      {{ currentCharacters }} <b>/ {{ charsLimit }} caracteres</b>
    </span>

    <span
      v-if="wordsLimit >= 0"
      class="words-limit"
    >
      {{ currentWords }} <b>/ {{ wordsLimit }} palabras</b>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, computed } from 'vue'
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
  placeholder: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 3,
  },
  charsLimit: {
    type: Number,
    default: -1,
  },
  wordsLimit: {
    type: Number,
    default: -1,
  },
})

const emit = defineEmits(['update:value'])

const innerValue: Ref<string> = ref(String(props.value))
watch(innerValue, (value) => {
  sendText(String(value))
})

const currentCharacters = computed(() => innerValue.value.length)
const currentWords = computed(() => {
  return innerValue.value.match(/\b(\w+)\b/g)?.length ?? 0
})

function sendText(value: string): void {
  let newValue = value

  if (props.charsLimit >= 0) {
    newValue = cutExcessCharacters(value)
  }

  if (props.wordsLimit >= 0) {
    newValue = cutExcessWords(value)
  }

  innerValue.value = newValue
  emit('update:value', newValue)
}

function cutExcessCharacters(textToCut: string): string {
  return textToCut.slice(0, props.charsLimit)
}

function cutExcessWords(textToCut: string): string {
  const words = textToCut.split(' ')
  return words.slice(0, props.wordsLimit).join(' ')
}
</script>

<style lang="scss" scoped>
.BaseText {
  display: grid;

  .label {
    font-weight: 600;
    margin-bottom: $spacing-xs;
  }

  .text {
    display: flex;
    border: 1px solid $color-neutral-mid;
    border-radius: $border-radius-m;
    overflow: hidden;
    background-color: #fff;
    box-shadow: $shadow-xs;

    &:has(textarea:focus) {
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

    textarea {
      all: unset;
      flex: 1;
      padding: $spacing-xs $spacing-m;
      background-color: #fff0;
    }
  }

  .chars-limit {
    font-size: $font-size-s;
    text-align: right;
  }

  .words-limit {
    font-size: $font-size-s;
    text-align: right;
  }
}
</style>
