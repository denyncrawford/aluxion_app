<script setup lang="ts">
import aluxionLogo from '../assets/aluxion.svg'
import SearchBar from './SearchBar.vue'
</script>
<template>
  <nav class="w-full p-20 flex items-center justify-center">
    <router-link to="/">
      <img :src="aluxionLogo" />
    </router-link>
    <div class="ml-auto mr-10 flex">
      <SearchBar/>
    </div>
  </nav>
</template>