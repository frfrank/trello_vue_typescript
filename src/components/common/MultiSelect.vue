<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Option } from '@/types'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const KEY_CODES = Object.freeze({
  ENTER: 'Enter',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
})

type SelectedOptions = Map<number | string, number | string>

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
    type: Array as () => (string | number)[],
    default: () => [],
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

const selectedOptions: Ref<SelectedOptions> = ref(new Map())
const filteredOptions: Ref<Option[]> = ref(props.options)
const search: Ref<string | number> = ref('')
const showOptions: Ref<boolean> = ref(false)
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

  loadValues()
})

function loadValues() {
  props.value.forEach((key) => {
    const value = props.options.find((o: Option) => o.key === key)
    if (value) {
      selectedOptions.value.set(key, value.value)
    }
  })
}

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

function getSelectedOptionsKeys(): (string | number)[] {
  let keys: (string | number)[] = []
  for (const [key] of selectedOptions.value) {
    keys = [...keys, key]
  }

  return keys
}

function updateSelectedOptions(newOption: Option): void {
  if (selectedOptions.value.has(newOption.key)) {
    selectedOptions.value.delete(newOption.key)
  } else {
    selectedOptions.value.set(newOption.key, newOption.value)
  }

  const keys = getSelectedOptionsKeys()
  emit('update:value', keys)
}

function selectOption(option: Option): void {
  search.value = ''
  showOptions.value = false

  updateSelectedOptions(option)
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
    class="MultiSelect"
  >
    <label
      :for="name"
      class="label"
    >
      <span v-if="label">
        {{ label }}
      </span>
    </label>

    <div class="select">
      <div
        class="selections"
        data-test-id="selections"
      >
        <BaseButton
          v-for="[key, optionValue] in selectedOptions"
          :key="key"
          type="primary"
          :light="true"
          shape="rounded"
          size="sm"
          @click="updateSelectedOptions({ key, value: optionValue })"
        >
          {{ optionValue }}
          <icon icon="fas fa-times" />
        </BaseButton>
      </div>

      <BaseInput
        ref="childComponent"
        v-model:value="search"
        :name="name"
        :placeholder="placeholder"
        v-bind="{ autocomplete: 'off' }"
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
    </div>

    <ul
      v-if="showOptions"
      class="options"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        :class="{ active: index === currentIndex, selected: selectedOptions.has(option.key) }"
        @click="selectOption(option)"
        v-html="option?.valueHtml ?? option.value"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.MultiSelect {
  position: relative;

  .label {
    font-weight: 600;
  }

  .select {
    display: grid;

    .selections {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: $spacing-2xs;
      padding: $spacing-2xs;

      .Tag {
        cursor: pointer;
      }
    }
  }

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
      padding: $spacing-xs;
      cursor: pointer;

      &:hover,
      &.active {
        background-color: $color-primary-lightest;
      }

      &.selected {
        background-color: $color-danger-lightest;
        &.active,
        &:hover {
          background-color: $color-danger-lighter;
        }
      }
    }
  }
}
</style>
