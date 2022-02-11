<script setup lang='ts'>
import aluxionLogo from '../assets/aluxion.svg'
import SearchIcon from '../components/utils/SearchIcon.vue'
import { ref, onMounted } from 'vue'
let isFocus = ref(false)
let isScrolled = ref(false)
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
  <header class="bg-main w-full fixed top-0">
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
        :class="[isScrolled ? 'pt-16' : 'pt-64']"
        class="flex w-full transition-all delay-200 duration-500 items-baseline"
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
        <div
          class="
            before
            group
            relative
            w-8xl
            flex flex-1
            ml-auto
            items-center
            text-gray-500
            mt-auto
            overflow-hidden
            max-w-md
          "
          :class="{ after: isFocus }"
        >
          <input
            @focus="isFocus = true"
            @blur="isFocus = false"
            class="
              input-mixin
              w-full
              text-white
              transition-colors
              p-0
              focus:placeholder-white
            "
            placeholder="¿Cuál es tu parada?"
            type="text"
          />
          <SearchIcon class="input-icon w-5 transition-colors fill-gray-500" />
        </div>
      </div>
    </main>
  </header>
</template>

<style scoped>
.liMenu {
  @apply ml-28 text-white tracking-wider;
}

.input-mixin:focus + .input-icon {
  @apply fill-white;
}

.before {
  @apply before:bg-gray-500 before:w-full before:h-[.1px] 
  before:absolute before:bottom-1 before:left-0 after:left-full 
  after:duration-500 before:duration-500 before:transition-all after:transition-all;
}

.after {
  @apply after:bg-white after:w-full after:h-[.1px] after:absolute after:bottom-1 after:left-0 before:-left-full;
}
</style>