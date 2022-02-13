
<script setup lang="ts">
// Declarations

import { onMounted, reactive, ref, computed, Ref, watch } from 'vue'
import { fetchStopData, fetchStopArrivals } from '../services/emt.service'
import { wrapGrid } from 'animate-css-grid'
import styles from '../assets/gstyles.json'
import type { Stop, Arrivals, Arrive, ArrivalMerge } from '../types'
import NotFound from './NotFound.vue'
import { useRoute, useRouter } from 'vue-router'
import SNav from '../components/SecondaryNavigation.vue'
import BusCard from '../components/BusCard.vue'
import BusIcon from '../components/icons/BusIcon.vue'
import BackIcon from '../components/icons/BackIcon.vue'
import GridIcon from '../components/icons/GridIcon.vue'
import CardsIcon from '../components/icons/CardsIcon.vue'
import { useStore } from '../stores/navbars.store'

// States

const router = useRouter()
const route = useRoute()
const isNotFoundVisible = ref(false)
const isLoading = ref(true)
const canAppear = ref(false)
const gMap = ref()
const navState = useStore();
const selectedCard = ref(0);

const gridRefs = reactive([] as Ref<HTMLDivElement>[])

let stop = ref({
  stopId: '',
  stopName: '',
  geometry: {
    type: '',
    coordinates: [0, 0],
  },
  Direction: '',
} as Stop)

const arrivalsInfo = ref([] as Arrivals[])
const arrivals = ref([] as Arrive[])

// Static data

const options = {
  circle: {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
  },
  map: {
    styles: styles,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  },
}

// Computed

const mergedArrivals = computed(() => {
  const arvs = arrivals.value.reduce((r, a) => {
    r[a.line] = r[a.line] || []
    r[a.line].push(a)
    return r
  }, Object.create(null))
  return Object.keys(arvs).map((k) => ({ line: k, arrivals: arvs[k] }))
})

const formatArrivals = computed(() => {
  return arrivals.value.map((a) => {
    return { position: { lng: a.geometry.coordinates[0], lat: a.geometry.coordinates[1] }, bus: a.bus }
  })
})

const isSelected = computed(() => (bus: number) => selectedCard.value === bus)

// Methods

const setItemRef = (el: Ref<HTMLDivElement>) => {
  if (!el) return
  gridRefs.push(el)
}

// Function toke is used internally to execute as a method with parameters

function performSelect (arrival: Arrive) {
  console.log(arrival);
  
  const [lng, lat] = arrival.geometry.coordinates
  selectedCard.value = arrival.bus;
  gMap.value.panTo({ lat, lng, duration: 500 })
}

async function unmount(timeout: number) {
  canAppear.value = false
  await new Promise((resolve) => setTimeout(resolve, timeout))
  isLoading.value = true
}

const goBack = async () => {
  await unmount(1500)
  router.back()
}

// Hooks

onMounted(async () => {
  try {
    arrivalsInfo.value = (await fetchStopArrivals(
      route.params.id as string
    )) as Arrivals[]

    if (!arrivalsInfo.value.length) return (isNotFoundVisible.value = true)

    stop.value = arrivalsInfo.value[0].StopInfo[0]

    const [lng, lat] = stop.value.geometry.coordinates
    arrivals.value = arrivalsInfo.value[0].Arrive
    gMap.value.panTo({ lat, lng })
    isLoading.value = false

    await new Promise((resolve) => setTimeout(resolve, 1000))
    gridRefs.forEach((ref) => {
      if (!ref) return 
      wrapGrid(ref as any, { easing: 'anticipate', duration: 500, stagger: 100 })
    })
    canAppear.value = true
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="absolute w-full h-full">
    <transition name="zoom">
      <NotFound v-if="isNotFoundVisible" />
    </transition>
    <transition name="fade">
      <div v-show="!isLoading" class="w-full relative h-full flex overflow-hidden">
        <div
          :class="[!canAppear ? 'md:w-0' : 'md:w-3/6 w-full']"
          class="relative transition-all duration-1000 overflow-auto b-20"
        >
          <div
            :class="[canAppear ? 'md:left-0 md:opacity-100' : 'md:-left-full md:opacity-0']"
            class="md:absolute top-0 transition-all duration-500 w-full h-full"
          >
            <div class="sticky">
              <SNav @unmount="unmount(500)" />
            </div>
            <header class="md:mx-20 mx-5 flex relative">
              <div class="flex flex-col w-full">
                <div class="cursor-pointer" @click="goBack">
                  <BackIcon class="opacity-60 fill-gray-400" />
                </div>
                <h2 class="font-bold mt-4 text-sm text-gray-400 opacity-40">
                  Autobuses cercanos
                </h2>
                <h1
                  class="
                    text-[33px]
                    font-bold
                    mr-auto
                    pb-2
                    after
                    leading-tight
                    mt-1
                    md:relative
                    max-w-md
                  "
                >
                  {{ stop.Direction.trim().split(',').reverse().join(', ') }}
                </h1>
              </div>
              <div class="ml-auto md:flex hidden mt-auto pb-2">
                <GridIcon @click="navState.isGridMode = true" :class="[navState.isGridMode ? 'opacity-100' : 'opacity-60']" class="gridMixin" />
                <CardsIcon @click="navState.isGridMode = false" :class="[!navState.isGridMode ? 'opacity-100' : 'opacity-60']" class="gridMixin ml-4" />
              </div>
            </header>
            <div class="md:px-20 px-5 pb-20">
              <div
                class="mt-10"
                :key="block.line"
                v-for="block in mergedArrivals"
              >
                <div class="flex items-center">
                  <BusIcon class="fill-sky-400 ml-3" />
                  <h1 class="text-xl ml-5 opacity-100">
                    Línea {{ block.line }}
                  </h1>
                </div>
                <div :ref="setItemRef" :class="[navState.isGridMode ? 'grid-cols-2': 'grid-cols-1']" class="grid mt-4 w-full gap-4">
                  <BusCard
                    @click="performSelect(arrival)"
                    :key="arrival.bus"
                    :selected="isSelected(arrival.bus)"
                    :arrival="arrival"
                    :lineData="stop.lines.find((l) => l.label === arrival.line)"
                    v-for="arrival in block.arrivals"
                    class="col-span-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute left-full md:left-0 w-full h-full md:relative md:w-auto md:h-auto md:flex-1 transition-all">
          <GMapMap
            ref="gMap"
            :center="{
              lat: stop.geometry.coordinates[1],
              lng: stop.geometry.coordinates[0],
            }"
            :zoom="15"
            :disableDefaultUI="true"
            :options="options.map"
            map-type-id="roadmap"
            class="w-full h-full"
          >
            <GMapCluster>
              <GMapMarker
                  :key="m.bus"
                  v-for="m in formatArrivals"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center=m.position"
              />
            </GMapCluster>
          </GMapMap>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.after {
  @apply after:bg-gray-700 after:w-full md:after:w-10/12 after:h-[1px] after:absolute after:bottom-0 after:left-0 after:opacity-70;
}

.gridMixin {
  @apply transition cursor-pointer hover:opacity-100 hover:scale-110;
}

.zoom-enter-active {
  animation: zoomIn;
  animation-duration: 0.5s;
}

.zoom-leave-active {
  animation: zoomOut;
  animation-duration: 0.5s;
}

.fade-enter-active {
  animation: fadeIn;
  animation-duration: 0.5s;
}

.fade-leave-active {
  animation: fadeOut;
  animation-duration: 0.5s;
}
</style>
