<script setup lang="ts">
// Definitions

const props = defineProps(['state'])
const emit = defineEmits(['close'])

// Methods

function toggleActive() {
  emit('close')
}
</script>

<template>
  <transition name="fadeIn">
    <div
      @click="toggleActive"
      v-if="props.state.active"
      class="
        absolute
        backdrop-blur-sm
        top-0
        left-0
        bg-main/80
        z-50
        w-full
        h-full
      "
    ></div>
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
</style>
