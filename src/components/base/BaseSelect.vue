<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { Option } from '@/types'
import BaseInput from '@/components/base/BaseInput.vue'
import Tag from '@/components/common/Tag.vue'

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
  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('.SimpleSelect')) {
      return
    }

    showOptions.value = false
  })
})

function selectOption(option: Option): void {
  search.value = option.value
  showOptions.value = false

  emit('update:value', option.key)
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
      data-test-id="option-selected"
      :name="name"
      :label="label"
      :placeholder="placeholder"
      v-bind="{ disabled: true }"
      @click="showOptions = !showOptions"
    >
      <template #before>
        <slot name="before" />
      </template>

      <template #after>
        <Tag type="quaternary">
          <icon
            icon="fa-solid fa-caret-right"
            :rotation="showOptions ? 90 : 0"
          />
        </Tag>
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
