<script setup lang="ts">
import { ref } from 'vue';
import aluxionLogo from '../assets/aluxion.svg'
import SearchBar from './SearchBar.vue'
import { useRouter } from 'vue-router'
import BurgerIcon from './icons/BurgerIcon.vue'
import XIcon from './icons/XIcon.vue'
import { useStore } from '../stores/navbars.store'

const router = useRouter();
const emit = defineEmits(['unmount']);

const navbars = useStore();

const isMenuOpen = ref(false)

const openNav = () => {
  navbars.isMobileNavbarOpen = true
}

const closeNav = () => {
  navbars.isMobileNavbarOpen = false
}


const routeToHome = async () => {
  emit('unmount');
  await new Promise(resolve => setTimeout(resolve, 1000));
  router.push('/');
}

</script>
<template>
  <nav class="w-full px-5 py-10 flex items-center justify-center">
    <div @click="routeToHome" class="cursor-pointer">
      <img :src="aluxionLogo" />
    </div>
    <div class="ml-auto w-3xl flex">
      <div v-show="!navbars.isMobileNavbarOpen" class="md:hidden cursor-pointer ml-auto">
        <BurgerIcon @click="openNav" />
      </div>
      <div v-show="navbars.isMobileNavbarOpen" class="md:hidden cursor-pointer ml-auto">
        <XIcon @click="closeNav" />
      </div>
    </div>
  </nav>
</template>