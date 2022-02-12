<script setup lang="ts">
// Declarations
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SearchIcon from '../components/utils/SearchIcon.vue'

// States

const value = ref('')
const isFocus = ref(false)
const router = useRouter()

// Methods

const search = () => {
  router.push({
    name: 'results',
    params: {
      id: value.value,
    },
  })
}

</script>

<template>
  <div
    class="
      before
      group
      relative
      w-9/12
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
    <SearchIcon @click="search" class="input-icon w-5 transition-colors fill-gray-500 cursor-pointer" />
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
  after:bg-white after:w-full after:h-[.1px] after:absolute after:bottom-1;
}

.after {
  @apply after:right-0 before:-right-full;
}
</style>