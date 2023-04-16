<script setup lang="ts">
import { ref } from 'vue'

import Modal from '@/components/common/Modal.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const modalVisible = ref<boolean>(false)
</script>

<template>
  <BaseButton @click="modalVisible = true"> Open modal </BaseButton>

  <Modal
    v-if="modalVisible"
    @close="modalVisible = false"
  >
    <template #title> Modal title </template>

    <template #body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sapiente odit, nisi suscipit et officia cum
      itaque quam harum qui id natus doloribus dolorem? Consequuntur ab deleniti inventore sint odit?
    </template>
  </Modal>
</template>
