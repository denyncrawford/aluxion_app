<script setup lang="ts">
import Navigation from './components/MainNavigation.vue'
</script>

<template>
  <main class="min-h-screen relative overscroll-none flex flex-col bg-main">
    <Navigation class="fixed top-0" />
    <div class="relative flex-1 w-full pt-[664px]">
      <router-view />
    </div>
  </main>
</template>

<style></style>
