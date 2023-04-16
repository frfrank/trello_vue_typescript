<script setup lang="ts">
import Aside from '@/components/main/Aside.vue'
import Header from '@/components/main/Header.vue'
import Footer from '@/components/main/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <Aside />

    <Header />

    <div class="content">
      <RouterView />
    </div>

    <Footer />
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  grid-template-areas:
    'aside header'
    'aside content'
    'aside footer';
  overflow: hidden;
  height: 100vh;

  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;

  .Aside {
    grid-area: aside;
  }

  .Header {
    grid-area: header;
  }

  .content {
    grid-area: content;
    overflow: auto;
    background-color: $color-neutral-lightest;
  }

  .Footer {
    grid-area: footer;
  }
}
</style>
