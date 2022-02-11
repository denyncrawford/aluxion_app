<script setup lang="ts">
import { ref, watch } from 'vue'
const isActive = ref(false)
const state = ref({
  toHome: '',
  toAluxion: '',
})
watch(isActive, (value) => {
  value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})

function toggleActive() {
  isActive.value = !isActive.value
}

function setData(data: typeof state.value) {
  state.value.toHome = data.toHome;
  state.value.toAluxion = data.toAluxion;
}

</script>
<template>
  <div v-if="isActive" class="absolute top-0 left-0 bg-main z-50 w-full h-full">
    
  </div>
</template>
