<script setup lang='ts'>
// Declarations
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/navbars.store'
import aluxionLogo from '../assets/aluxion.svg'
import SearchBar from './SearchBar.vue'
import BurgerIcon from './icons/BurgerIcon.vue'
import XIcon from './icons/XIcon.vue'

// States

let isScrolled = ref(false)
const router = useRouter()
const navbars = useStore()

const isMenuOpen = ref(false)

const openNav = () => {
  isMenuOpen.value = true
}

const closeNav = () => {
  isMenuOpen.value = false
}

// Computed

const isMobile = ref(window.innerWidth < 768)

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768
})

// Hooks

onMounted(() => {
  window.addEventListener('scroll', (e) => {
    if (window.scrollY > 100) {
      isScrolled.value = true
    } else {
      isScrolled.value = false
    }
  })
})
</script>

<template>
  <header class="anchor pb-12 bg-main w-full">
    <nav class="w-full p-5 md:px-20 py-10 md:py-20 flex items-center">
      <router-link to="/">
        <img :src="aluxionLogo" />
      </router-link>
      <transition name="fadeUp" appear>
        <ul key="nav1"
          v-show="!isMobile || isMenuOpen"
          class="
            absolute
            md:relative
            mt-20
            md:mt-0
            text-center
            pt-60
            md:pt-0
            flex-col
            md:flex-row
            bg-main
            z-50
            top-0
            left-0
            w-screen
            md:h-auto md:w-auto
            h-screen
            flex
            md:ml-auto
            mr-10
          "
        >
          <li class="liMenu md:py-0 py-5">
            <router-link
              @click="isMenuOpen = false"
              class="md:text-sm text-2xl"
              tag="h5"
              to="/"
              >metro</router-link
            >
          </li>
          <li class="liMenu md:py-0 py-5">
            <router-link
              @click="isMenuOpen = false"
              class="md:text-sm text-2xl"
              tag="h5"
              to="/"
              >cercanías</router-link
            >
          </li>
          <li class="liMenu md:py-0 py-5">
            <router-link
              @click="isMenuOpen = false"
              class="md:text-sm text-2xl"
              tag="h5"
              to="/"
              >carsharing</router-link
            >
          </li>
        </ul>
      </transition>
      <div v-show="!isMenuOpen" class="md:hidden cursor-pointer ml-auto">
        <BurgerIcon @click="openNav" />
      </div>
      <div v-show="isMenuOpen" class="md:hidden cursor-pointer ml-auto">
        <XIcon @click="closeNav" />
      </div>
    </nav>
    <main
      class="
        mx-5
        relative
        md:mx-20
        after:h-[1px] after:absolute after:-bottom-4 after:bg-gray-500 after:opacity-70
        after:w-full after:z-10 md:after:opacity-0
      "
    >
      <div
        :class="[isScrolled ? 'pt-16' : 'pt-60']"
        class="
          flex
          anchor
          overscroll-none
          w-full
          transition-all
          relative
          delay-200
          duration-500
          items-baseline
        "
      >
        <h1
          :class="[isScrolled ? 'lg:text-5xl' : 'lg:text-8xl']"
          class="
            text-3xl
            flex
            font-black
            transition-all
            delay-200
            duration-500
            max-w-4xl
            tracking-wide
            opacity-90
          "
        >
          Don't be late, aluxioner
        </h1>
        <SearchBar class="min-w-[50px]" />
      </div>
    </main>
  </header>
</template>

<style scoped>

.fadeUp-enter-active {
  animation: fadeInUp;
  animation-duration: 0.5ms;
}

.fadeUp-leave-active {
  animation: fadeOutUp;
  animation-duration: 0.5ms;
}

.liMenu {
  @apply md:ml-28 text-white tracking-wider;
}
.anchor {
  overflow-anchor: none;
}
</style>