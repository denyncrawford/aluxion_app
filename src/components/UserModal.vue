<script setup lang="ts">
// Definitions

import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// States

const props = defineProps(['state'])
const emit = defineEmits(['close'])
const isWhiteActive = ref(false)
const router = useRouter()

// Watchers

watch(props, async (value) => {
  console.log(Object.assign({}, value.state))
  value.state.active
    ? await new Promise((resolve) => setTimeout(resolve, 500))
    : null
  isWhiteActive.value = value.state.active
})

// Methods

const close = async () => {
  isWhiteActive.value = false
  await new Promise((resolve) => setTimeout(resolve, 500))
  emit('close')
}

const navigate = async (to: string) => {
  await close()
  router.push({
    name: 'results',
    params: {
      id: to,
    },
  })
}
</script>

<template>
  <transition name="fadeIn">
    <div
      v-if="props.state.active"
      class="fixed backdrop-blur-sm top-0 left-0 bg-main/80 z-50 w-full h-full"
    >
      <div class="w-full h-full relative flex items-center justify-center">
        <div
          @click="close"
          class="overlay z-0 position absolute w-full h-full top-0 left-0"
        ></div>
        <transition name="zoom">
          <div
            v-show="isWhiteActive"
            class="bg-white px-32 py-10 opacity-90 flex flex-col text-center"
          >
            <div class="mb-10">
              <button class="text-main" @click="close">cerrar</button>
            </div>
            <h1 class="text-main text-3xl font-black">
              Hey {{ props.state.data.first }}, <br />
              ¿Cuál es tu rumbo, aluxioner?
            </h1>
            <div class="mt-10 my-5">
              <button @click="navigate(props.state.data.toHome)" class="button">
                casa
              </button>
              <button
                @click="navigate(props.state.data.toAluxion)"
                class="button ml-[83px]"
              >
                aluxion
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fadeIn-enter-active {
  animation: fadeIn;
  animation-duration: 0.5s;
}

.fadeIn-leave-active {
  animation: fadeOut;
  animation-duration: 1s;
}

.zoom-enter-active {
  animation: zoomIn;
  animation-duration: 0.5s;
}

.zoom-leave-active {
  animation: zoomOut;
  animation-duration: 0.5s;
}

.button {
  @apply w-[112px] py-2 rounded-3xl transition hover:scale-110 bg-main;
}
</style>
