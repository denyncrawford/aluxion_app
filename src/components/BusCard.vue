
<script setup lang="ts">
// Declarations
import { computed, ref, watch } from 'vue'
import CircuitIcon from '../components/icons/CircuitIcon.vue'
import ClockIcon from '../components/icons/ClockIcon.vue'
import { useStore } from '../stores/navbars.store'
import { isMobile } from '../plugins/breakpoints'

const navState = useStore()

// States

const props = defineProps(['arrival', 'lineData', 'selected'])
const direction = props.lineData.to

// Hooks

// Computed

const formatedDirection = computed(() => {
  const A = props.lineData.nameA
  const B = props.lineData.nameB

  return direction === 'A' ? [A, B] : [B, A]
})

watch(isMobile, (value) => {
  if (value) navState.isGridMode = false
})

const printDistance = computed(() => {
  const distance = props.arrival.DistanceBus
  const km = Math.ceil(distance / 1000)
  const m = distance % 1000
  return m === 0 ? `${km} km` : `${m} mt`
})
</script>

<template>
  <!-- Init of Card -->
  <div class="w-full grid-item origin-left">
    <div
      :class="[selected ? 'bg-white' : 'bg-secondary']"
      class="
        overflow-hidden
        w-full
        relative
        group
        hover
        transition-all
        cursor-pointer
        rounded-[4px]
        p-5
        flex
      "
    >
      <!-- Main Title -->
      <h1
        :class="[selected ? 'text-main' : 'text-white']"
        class="
          mt-1
          text-white
          transition-all
          text-2xl
          group-hover:text-main
          opacity-100
          font-[sans-serif] font-semibold
        "
      >
        {{ arrival.line }}
      </h1>
      <!-- Subtitle -->
      <div
        :class="[navState.isGridMode && !isMobile ? 'flex-col' : isMobile ? 'flex-col' : 'flex-row']"
        class="ml-3 flex w-full"
      >
        <div class="flex flex-col">
          <h2
            :class="[selected ? 'text-main' : 'text-white']"
            class="
              textMixin
              font-bold
              text-[18px]
              group-hover:text-main
              text-white
              opacity-100
            "
          >
            {{ formatedDirection[0].toLowerCase() }}
          </h2>
          <h1
            class="
              textMixin
              text-xs
              mt-0.5
              text-gray-400
              font-light font-[sans-serif]
            "
          >
            {{ formatedDirection[1].toLowerCase() }}
          </h1>
        </div>
        <!-- Arrival Info -->
        <div
          :class="[navState.isGridMode  && !isMobile ? 'mt-5' : isMobile ? 'mt-5' : 'mt-0 ml-auto']"
          class="flex"
        >
          <div class="flex items-center">
            <ClockIcon class="w-5 h-5" />
            <h1
              class="
                textMixin
                ml-2
                text-sm text-[#FFC121]
                font-light font-[sans-serif]
              "
            >
              {{ Math.trunc(arrival.estimateArrive / 60) }} min
            </h1>
          </div>
          <div
            :class="[navState.isGridMode ? 'ml-auto' : 'ml-20']"
            class="flex items-center"
          >
            <CircuitIcon class="w-5 h-5" />
            <h1
              class="
                textMixin
                ml-2
                text-sm text-[#2DC8A6]
                font-light font-[sans-serif]
              "
            >
              {{ printDistance }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.textMixin {
  @apply tracking-wider capitalize transition-all leading-tight;
}

.selected {
  @apply text-gray-700 bg-white;
}

.hover {
  @apply hover:bg-white hover:text-main hover:scale-[1.01];
}
</style>