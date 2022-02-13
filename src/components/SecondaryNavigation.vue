<script setup lang="ts">
import aluxionLogo from '../assets/aluxion.svg'
import SearchBar from './SearchBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const emit = defineEmits(['unmount']);

const routeToHome = async () => {
  emit('unmount');
  await new Promise(resolve => setTimeout(resolve, 1000));
  router.push('/');
}

</script>
<template>
  <nav class="w-full px-5 md:px-20 py-7 md:py-12 flex items-center justify-center">
    <div @click="routeToHome" class="cursor-pointer">
      <img :src="aluxionLogo" />
    </div>
    <div class="ml-auto mr-10 w-3xl flex">
      <SearchBar/>
    </div>
  </nav>
</template>