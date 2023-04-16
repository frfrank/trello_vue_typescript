<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <p><b>sizes: </b></p>
  <div class="sizes">
    <BaseButton size="lg"> Large </BaseButton>
    <BaseButton size="md"> Medium </BaseButton>
    <BaseButton size="sm"> Small </BaseButton>

    <BaseButton
      size="lg"
      shape="circular"
    >
      <icon icon="fa-solid fa-times" />
    </BaseButton>
    <BaseButton
      size="md"
      shape="circular"
    >
      <icon icon="fa-solid fa-times" />
    </BaseButton>
    <BaseButton
      size="sm"
      shape="circular"
    >
      <icon icon="fa-solid fa-times" />
    </BaseButton>
  </div>

  <p><b>types: </b></p>
  <div class="types">
    <BaseButton type="primary"> Primary </BaseButton>

    <BaseButton type="secondary"> Secondary </BaseButton>

    <BaseButton type="tertiary"> Tertiary </BaseButton>

    <BaseButton type="quaternary"> Quaternary </BaseButton>
  </div>

  <p><b>lights: </b></p>
  <div class="lights">
    <BaseButton
      type="primary"
      :light="true"
    >
      Primary light
    </BaseButton>

    <BaseButton
      type="secondary"
      :light="true"
    >
      Secondary light
    </BaseButton>

    <BaseButton
      type="tertiary"
      :light="true"
    >
      Tertiary light
    </BaseButton>
  </div>

  <p><b>shapes: </b></p>
  <div class="shapes">
    <BaseButton shape="square">
      <icon icon="fa-solid fa-times" />
      Square
    </BaseButton>

    <BaseButton shape="normal">
      <icon icon="fa-solid fa-times" />
      Normal
    </BaseButton>

    <BaseButton shape="rounded">
      <icon icon="fa-solid fa-times" />
      Rounded
    </BaseButton>

    <BaseButton shape="circular">
      <icon icon="fa-solid fa-times" />
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.sizes,
.types,
.lights,
.shapes {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: $spacing-xs;
}
</style>
