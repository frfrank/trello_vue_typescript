<template>
  <div
    class="Modal"
    @click="closeFromBackground"
  >
    <div
      class="content"
      data-test-id="content"
    >
      <div class="header">
        <h2 class="title">
          <slot name="title" />
        </h2>

        <BaseButton
          data-test-id="close"
          class="close-button"
          type="quaternary"
          @click="closeFromXButton"
        >
          <icon icon="fas fa-times" />
        </BaseButton>
      </div>

      <div class="body">
        <slot name="body" />
      </div>
    </div>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, onBeforeUnmount } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'

const emit = defineEmits(['close'])

onMounted(() => {
  document.addEventListener('keydown', closeFromKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', closeFromKey)
})

function closeFromXButton(): void {
  closeModal()
}

function closeFromBackground(e: MouseEvent): void {
  const targetClass = (e.target as HTMLElement).classList
  const isOverlay = targetClass.contains('Modal')

  if (isOverlay) {
    closeModal()
  }
}

function closeFromKey(e: KeyboardEvent): void {
  const isEscape = e.key === 'Escape'

  if (isEscape) {
    closeModal()
  }
}

function closeModal(): void {
  emit('close')
}
</script>

<style lang="scss" scoped>
.Modal {
  position: fixed;
  inset: 0;
  z-index: 20;
  background-color: adjust-color($color: $color-secondary-darker, $alpha: -0.4);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  padding: $spacing-m;

  .title {
    margin: 0;
  }

  .content {
    background-color: #fff;
    border-radius: $border-radius-m;
    overflow: hidden;

    .header,
    .body,
    .footer {
      padding: $spacing-s $spacing-m;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $spacing-l;
      background-color: $color-neutral-lightest;
    }
  }
}
</style>
