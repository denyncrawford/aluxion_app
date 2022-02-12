<script setup lang='ts'>
// Declarations
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores/navbars.store'
import aluxionLogo from '../assets/aluxion.svg'
import SearchBar from './SearchBar.vue'

// States

let isScrolled = ref(false)
const router = useRouter();
const navbars = useStore();

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
    <nav class="w-full p-20 flex items-center justify-center">
      <router-link to="/">
        <img :src="aluxionLogo" />
      </router-link>
      <ul class="ml-auto mr-10 flex">
        <li class="liMenu">
          <router-link tag="h5" to="/">metro</router-link>
        </li>
        <li class="liMenu">
          <router-link tag="h5" to="/">cercanías</router-link>
        </li>
        <li class="liMenu">
          <router-link tag="h5" to="/">carsharing</router-link>
        </li>
      </ul>
    </nav>
    <main class="mx-20">
      <div
        :class="[isScrolled ? 'pt-16' : 'pt-60']"
        class="flex anchor overscroll-none w-full transition-all delay-200 duration-500 items-baseline"
      >
        <h1
          :class="[isScrolled ? 'text-5xl' : 'text-8xl']"
          class="
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
        <SearchBar/>
      </div>
    </main>
  </header>
</template>

<style scoped>
.liMenu {
  @apply ml-28 text-white tracking-wider;
}
.anchor {
  overflow-anchor: none;
}

</style>