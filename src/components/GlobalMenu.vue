<script setup lang="ts">
import { watch } from 'vue'
import { useStore } from '../stores/navbars.store'
import MobileNavigation from './MobileNavigation.vue'
import { isMobile } from '../plugins/breakpoints'

const navbars = useStore()

watch(isMobile, (value: boolean) => {
  if (!value) navbars.isMobileNavbarOpen = false
})
</script>
<template>
  <transition name="slide">
    <div v-if="navbars.isMobileNavbarOpen" class="fixed bg-main w-full z-50 h-full top-0 left-0">
      <MobileNavigation key="mobilenav2"/>
      <ul
        key="nav1"
        class="
          md:relative md:mt-0
          text-center
          pt-60
          flex-col
          bg-main
          w-full
          h-full
          flex
          items-center
          mr-10
        "
      >
        <li class="liMenu py-5">
          <router-link
            @click="navbars.isMobileNavbarOpen = false"
            class="text-2xl"
            tag="h5"
            to="/"
            >metro</router-link
          >
        </li>
        <li class="liMenu py-5">
          <router-link
            @click="navbars.isMobileNavbarOpen"
            class="text-2xl"
            tag="h5"
            to="/"
            >cercanías</router-link
          >
        </li>
        <li class="liMenu py-5">
          <router-link
            @click="navbars.isMobileNavbarOpen"
            class="text-2xl"
            tag="h5"
            to="/"
            >carsharing</router-link
          >
        </li>
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active {
  animation: fadeInDown;
  animation-duration: 0.5s;
}
.slide-leave-active {
  animation: fadeOutUp;
  animation-duration: 0.5s;
}
</style>