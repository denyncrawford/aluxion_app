<script setup lang="ts">
import Navigation from './components/MainNavigation.vue'
</script>

<template>
  <main class="min-h-screen relative overscroll-none flex flex-col bg-main">
    <Navigation class="sticky top-0" />
    <div>
      <router-view />
    </div>
  </main>
</template>

<style></style>
