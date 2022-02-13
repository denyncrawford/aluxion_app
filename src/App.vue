<script setup lang="ts">

// Declarations

import { useRouter } from 'vue-router'
import { useStore } from './stores/navbars.store'
import Navigation from './components/MainNavigation.vue'

// States

const navbars = useStore()
const router = useRouter()

// Hooks

router.beforeEach(async (to, from, next) => {
  //await new Promise(resolve => setTimeout(resolve, 1000))
  if (to.name === 'results') {
    navbars.isMainNavbarOpen = false;
  } else {
    navbars.isMainNavbarOpen = true;
  }
  next()
})

</script>

<template>
  <main class="min-h-screen relative overscroll-none flex flex-col bg-main">
    <Navigation :class="[navbars.isMainNavbarOpen ? 'top-0' : '-top-full']" class="fixed z-20 transition-all duration-1000" />
    <div :class="[navbars.isMainNavbarOpen ? 'md:pt-[664px] pt-[504px]' : 'pt-0']" class="flex-1 w-full transition-all duration-500">
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style>

.slide-enter-active {
  animation: fadeInUp;
  animation-duration: 1s;
}

.slide-leave-active {
  animation: fadeOutDown;
  animation-duration: 1s;
}

</style>
