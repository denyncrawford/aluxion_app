<script setup lang="ts">
// Declarations
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import SearchIcon from './icons/SearchIcon.vue'
import brakpoints from '../plugin/breakpoints'
import { isMobile } from '../plugins/breakpoints'

// States

const value = ref('')
const isFocus = ref(false)
const router = useRouter()
const isMobileSearch = ref(false)
const input2 = ref(null);

// Methods

const search = () => {
  router.push({
    name: 'results',
    params: {
      id: value.value,
    },
  })
}

const showMSearch = () => {
  console.log(isMobile.value)

  if (!isMobile.value) return search()
  isMobileSearch.value = true
  if (input2.value) input2.focus()
}
const hideMSearch = () => {
  isMobileSearch.value = false
}

watch(isMobile, (value) => {
  if (value) isMobileSearch.value = false
})
</script>

<template>
  <div
    class="
      before
      group
      md:relative
      lg:w-9/12
      flex flex-1
      ml-20
      xl:ml-auto
      items-center
      text-gray-500
      mt-auto
      overflow-hidden
      max-w-md
    "
    :class="{ after: isFocus }"
  >
    <input
      v-if="!isMobile"
      @focus="isFocus = true"
      @blur="isFocus = false"
      @keydown.enter="search"
      v-model="value"
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
    <transition name="fadex">
      <div
        key="search1"
        v-if="isMobile"
        v-show="isMobileSearch"
        class="absolute w-screen -left-5 bg-main pt-40 z-40 pb-16"
      >
        <input
          ref="input2"
          @blur="hideMSearch"
          @keydown.enter="search"
          v-model="value"
          class="
            transition-all
            border-none
            placeholder-white
            text-2xl
            bg-opacity-70
            w-screen
            px-5
            bg-secondary
            text-white
            font-bold
            p-0
            py-4
            focus:placeholder-white
          "
          placeholder="Nº de parada"
          type="text"
        />
        <SearchIcon
          v-if="!isMobileSearch"
          @click="showMSearch"
          class="
            input-icon
            ml-auto
            w-7
            md:w-5
            transition-colors
            fill-gray-500
            cursor-pointer
          "
        />
      </div>
    </transition>
    <SearchIcon
      v-if="!isMobileSearch"
      @click="showMSearch"
      class="
        input-icon
        ml-auto
        w-7
        md:w-5
        transition-colors
        fill-gray-500
        cursor-pointer
      "
    />
  </div>
</template>

<style scoped>

.input-mixin:focus + .input-icon {
  @apply fill-white;
}

.before {
  @apply before:bg-gray-500 before:w-full before:h-[.1px] 
  before:absolute before:bottom-1 before:right-0 after:right-full 
  after:duration-500 before:duration-500 before:transition-all after:transition-all
  after:bg-white after:w-full after:h-[.1px] after:absolute after:bottom-1
  after:opacity-0 md:after:opacity-100 before:opacity-0 md:before:opacity-100;
}

.after {
  @apply after:right-0 before:-right-full;
}
</style>