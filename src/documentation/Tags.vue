<script setup lang="ts">
import Tag from '@/components/common/Tag.vue'
</script>

<template>
  <p><b>sizes: </b></p>
  <div class="sizes">
    <Tag
      size="md"
      type="tertiary"
    >
      Medium
    </Tag>
    <Tag
      size="sm"
      type="tertiary"
    >
      Small
    </Tag>
  </div>

  <p><b>types: </b></p>
  <div class="types">
    <Tag type="primary"> Primary </Tag>
    <Tag type="secondary"> Secondary </Tag>
    <Tag type="tertiary"> Tertiary </Tag>
    <Tag type="quaternary"> Quaternary </Tag>
  </div>

  <p><b>outlines: </b></p>
  <div class="outlines">
    <Tag
      type="primary"
      shape="normal"
      :outline="true"
      size="sm"
    >
      Primary
    </Tag>

    <Tag
      type="secondary"
      shape="normal"
      :outline="true"
      size="sm"
    >
      Secondary
    </Tag>

    <Tag
      type="tertiary"
      shape="normal"
      :outline="true"
      size="sm"
    >
      Tertiary
    </Tag>

    <Tag
      type="quaternary"
      shape="normal"
      :outline="true"
      size="sm"
    >
      Quaternary
    </Tag>
  </div>

  <p><b>shapes: </b></p>
  <div class="shapes">
    <Tag
      type="primary"
      shape="rounded"
      :outline="true"
      size="sm"
    >
      Primary
    </Tag>

    <Tag
      type="secondary"
      shape="rounded"
      :outline="true"
      size="sm"
    >
      Secondary
    </Tag>

    <Tag
      type="tertiary"
      shape="rounded"
      :outline="true"
      size="sm"
    >
      Tertiary
    </Tag>

    <Tag
      type="quaternary"
      shape="rounded"
      :outline="true"
      size="sm"
    >
      Quaternary
    </Tag>
  </div>
</template>

<style lang="scss" scoped>
.sizes,
.types,
.outlines,
.shapes {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: $spacing-xs;
}
</style>
