<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Option } from '@/types'
import BaseInput from '@/components/base/BaseInput.vue'

const KEY_CODES = Object.freeze({
  ENTER: 'Enter',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
})

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
  options: {
    type: Array as () => Option[],
    required: true,
  },
})

const emit = defineEmits(['update:value'])
const root = ref<HTMLElement | null>(null)

const currentValue = props.options.find((o: Option) => o.key === props.value)
const search: Ref<string | number> = ref(currentValue?.value ?? '')
const showOptions: Ref<boolean> = ref(false)
const filteredOptions: Ref<Option[]> = ref(props.options)
const currentIndex: Ref<number> = ref(-1)

onMounted(() => {
  document.addEventListener('focusin', () => {
    if (root.value?.querySelector('input') === document.activeElement) {
      showOptions.value = true
    }
  })

  document.addEventListener('focusout', () => {
    setTimeout(() => {
      showOptions.value = false
    }, 500)
  })
})

function filterMatchingOptions(options: Option[], text: string): Option[] {
  return options.filter((option: Option) => {
    const value = String(option.value).toLowerCase()
    return value.includes(text)
  })
}

function addFormattedMatchingOptions(options: Option[], text: string): Option[] {
  const regexp = new RegExp(`(${text})`, 'gi')
  return options.map((option: Option) => ({
    ...option,
    valueHtml: String(option.value).replace(regexp, `<strong>$1</strong>`),
  }))
}

function handleInput(): void {
  const searchValue = String(search.value).toLowerCase()

  const optionsFiltered = filterMatchingOptions(props.options, searchValue)
  filteredOptions.value = addFormattedMatchingOptions(optionsFiltered, searchValue)

  showOptions.value = true
}

function selectOption(option: Option): void {
  search.value = option.value
  showOptions.value = false

  emit('update:value', option.key)
}

function moveUp(): void {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
    return
  }
}

function moveDown(): void {
  if (currentIndex.value < filteredOptions.value.length - 1) {
    currentIndex.value += 1
    return
  }
}

function pressEnter(): void {
  selectOption(filteredOptions.value[currentIndex.value])
}

function scrollToItem(index: number): void {
  const el = root.value?.querySelector(`ul > li:nth-child(${index})`)

  if (el) {
    el.scrollIntoView({ block: 'nearest' })
  }
}

function keypress(e: KeyboardEvent) {
  const { code } = e

  if (code === KEY_CODES.ENTER) {
    pressEnter()
  }

  if (code === KEY_CODES.UP) {
    moveUp()
  }

  if (code === KEY_CODES.DOWN) {
    moveDown()
  }

  scrollToItem(currentIndex.value + 1)
}
</script>

<template>
  <div
    ref="root"
    class="SimpleSelect"
  >
    <BaseInput
      ref="childComponent"
      v-model:value="search"
      :name="name"
      :label="label"
      :placeholder="placeholder"
      @input="handleInput"
      @keydown.stop="keypress"
    >
      <template #before>
        <slot name="before" />
      </template>

      <template #after>
        <slot name="after" />
      </template>
    </BaseInput>

    <ul
      v-if="showOptions"
      class="options"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="selectOption(option)"
        v-html="option?.valueHtml ?? option.value"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.SimpleSelect {
  position: relative;

  .BaseInput:has(:v-deep(input:focus)) + ul.options {
    // .BaseInput:has(input:focus) + ul.options {
    // display: block;
    background-color: red;
  }

  .options {
    display: none;
    all: unset;
    position: absolute;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: scroll;
    background-color: #fff;
    border: 1px solid $color-neutral-mid;
    border-top: none;
    z-index: 1;

    li {
      padding: 5px;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: $color-primary-lightest;
      }
    }
  }
}
</style>
