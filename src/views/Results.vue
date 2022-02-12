
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NotFound from './NotFound.vue'
import {
  fetchStopData,
  fetchStopArrivals,
} from '../services/emt.service'

const route = useRoute()
const isNotFoundVisible = ref(false)
const stop = ref([] as unknown[])
const arrivals = ref([] as unknown[]);

onMounted(async () => {
  try {
    stop.value = (await fetchStopData(route.params.id as string)) as unknown[];
    if (!stop.value.length) return (isNotFoundVisible.value = true)
    arrivals.value = (await fetchStopArrivals(route.params.id as string)) as unknown[];    
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="absolute w-full h-full">
    <transition name="zoom">
      <NotFound v-if="isNotFoundVisible"/>
    </transition>
  </div>
</template>

<style scoped>
.zoom-enter-active {
  animation: zoomIn;
  animation-duration: .5s;
}

.zoom-leave-active {
  animation: zoomOut;
  animation-duration: .5s;
}

</style>
