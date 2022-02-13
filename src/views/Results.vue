
<script setup lang="ts">
// Declarations

import { onMounted, reactive, ref, computed, Ref, watch } from 'vue'
import { fetchStopData, fetchStopArrivals } from '../services/emt.service'
import { wrapGrid } from 'animate-css-grid'
import styles from '../assets/gstyles.json'
import type {
  Stop,
  Arrivals,
  Arrive,
  FormattedArrival,
  ArrivalMerge,
} from '../types'
import NotFound from './NotFound.vue'
import { useRoute, useRouter } from 'vue-router'
import SNav from '../components/SecondaryNavigation.vue'
import BusCard from '../components/BusCard.vue'
import BusIcon from '../components/icons/BusIcon.vue'
import BackIcon from '../components/icons/BackIcon.vue'
import GridIcon from '../components/icons/GridIcon.vue'
import CardsIcon from '../components/icons/CardsIcon.vue'
import MapIcon from '../components/icons/MapIcon.vue'
import { useStore } from '../stores/navbars.store'
import mapPointSprite from '../assets/mapPointSprite.png'
import mapPointSpriteOpen from '../assets/mapPointSpriteOpen.png'
import { isMobile } from '../plugins/breakpoints'

// States

const router = useRouter()
const route = useRoute()
const isNotFoundVisible = ref(false)
const isLoading = ref(true)
const isMobileMapActive = ref(false)
const canAppear = ref(false)
const gMap = ref()
const navState = useStore()
const selectedCard = ref(0)

// DOM Refs

const gridRefs = reactive([] as Ref<HTMLDivElement>[])
const markerRefs = reactive([] as Ref<HTMLDivElement>[])
const leftPanel = ref(null as Ref<HTMLDivElement> | null)

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
const arrivalsCache = ref([] as Arrive[])
const arrivalsPagination = reactive({
  page: 0,
  limit: 6,
  total: 0,
})

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
    return {
      position: {
        lng: a.geometry.coordinates[0],
        lat: a.geometry.coordinates[1],
      },
      bus: a.bus,
      line: a.line,
      destination: a.destination,
    }
  })
})

const isSelected = computed(() => (bus: number) => selectedCard.value === bus)
const isToolTipVisible = ref(false)
const isToolTipGapVisible = ref(false)

// Methods

const setItemRef = (el: Ref<HTMLDivElement>) => {
  if (!el) return
  gridRefs.push(el)
}

const setMarkerRef = (el: Ref<HTMLDivElement>) => {
  if (!el) return
  markerRefs.push(el)
}

// Function toke is used internally to execute as a method with parameters

function formatArrival(arrival: Arrive): FormattedArrival {
  const {
    bus,
    line,
    destination,
    geometry: { coordinates },
  } = arrival
  return {
    position: { lng: coordinates[0], lat: coordinates[1] },
    bus,
    line,
    destination,
  }
}

// Handle selection state

function performSelect(arrival: FormattedArrival) {
  const { lng, lat } = arrival.position
  selectedCard.value = arrival.bus
  gMap.value.panTo({ lat, lng, duration: 500 })
}

// Called before unmounting

async function unmount(timeout: number) {
  canAppear.value = false
  await new Promise((resolve) => setTimeout(resolve, timeout))
  isLoading.value = true
}

// Go back to the previous page (Not Home)

const goBack = async () => {
  await unmount(1500)
  router.back()
}

// Hooks

watch(selectedCard, async (val) => {
  isToolTipVisible.value = false
  isToolTipGapVisible.value = false
  await new Promise((resolve) => setTimeout(resolve, 500))
  isToolTipVisible.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  isToolTipGapVisible.value = true
})

onMounted(async () => {
  try {
    arrivalsInfo.value = (await fetchStopArrivals(
      route.params.id as string
    )) as Arrivals[]

    if (!arrivalsInfo.value.length) return (isNotFoundVisible.value = true)

    stop.value = arrivalsInfo.value[0].StopInfo[0]

    const [lng, lat] = stop.value.geometry.coordinates
    arrivalsCache.value = arrivalsInfo.value[0].Arrive
    arrivalsPagination.total = arrivalsInfo.value[0].Arrive.length
    arrivals.value = arrivalsCache.value.slice(0, arrivalsPagination.limit)
    arrivalsPagination.page = 0
    gMap.value.panTo({ lat, lng })
    isLoading.value = false

    await new Promise((resolve) => setTimeout(resolve, 1000))
    gridRefs.forEach((ref) => {
      if (!ref) return
      wrapGrid(ref as any, {
        easing: 'anticipate',
        duration: 500,
        stagger: 100,
      })
    })

    // Cannot cache since it is dynamic data

    if (leftPanel.value)
      leftPanel.value.addEventListener('scroll', (e) => {
        if (route.name !== 'results' || !leftPanel.value) return
        let element = leftPanel.value
        if (element.getBoundingClientRect().bottom < window.innerHeight + 10) {
          if (arrivalsPagination.page <= arrivalsPagination.total) {
            arrivalsPagination.page += 1
            arrivals.value = [
              ...arrivals.value,
              ...arrivalsCache.value.slice(
                arrivalsPagination.page * arrivalsPagination.limit,
                (arrivalsPagination.page + 1) * arrivalsPagination.limit
              ),
            ]
          }
        }
      })

    if (isMobile) navState.isGridMode = false
    isMobileMapActive.value = false

    markerRefs.forEach((ref) => {
      console.log(ref)
    })

    canAppear.value = true
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="absolute w-full h-full">
    <!-- Not Found -->
    <transition name="zoom">
      <NotFound v-if="isNotFoundVisible" />
    </transition>
    <!-- Main View -->
    <transition name="fade">
      <div
        v-show="!isLoading"
        class="w-full relative h-full flex overflow-hidden"
      >
        <!-- Left Panel -->
        <div
          ref="leftPanel"
          :class="[!canAppear ? 'md:w-0 w-full' : 'md:w-3/6 w-full']"
          class="relative transition-all duration-1000 overflow-auto b-20"
        >
          <!-- Map icon visible only on mobile view -->
          <MapIcon
            @click="isMobileMapActive = true"
            v-if="isMobile"
            class="
              position
              z-50
              transition-all
              active:scale-125
              fixed
              bottom-5
              right-5
            "
          />
          <div
            :class="[
              canAppear
                ? 'md:left-0 md:opacity-100'
                : 'md:-left-full opacity-0',
            ]"
            class="md:absolute top-0 transition-all duration-500 w-full h-full"
          >
            <div class="sticky">
              <!-- Navigation -->
              <SNav @unmount="unmount(500)" />
            </div>
            <!-- Header and main title -->
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
              <!-- Grid icons -->
              <div class="ml-auto md:flex hidden mt-auto pb-2">
                <GridIcon
                  @click="navState.isGridMode = true"
                  :class="[navState.isGridMode ? 'opacity-100' : 'opacity-60']"
                  class="gridMixin"
                />
                <CardsIcon
                  @click="navState.isGridMode = false"
                  :class="[!navState.isGridMode ? 'opacity-100' : 'opacity-60']"
                  class="gridMixin ml-4"
                />
              </div>
            </header>
            <!-- Begin of lines display -->
            <!-- Every line has a grid of buses and it formatted by the mergedArrivals computed property-->
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
                <!-- We set every item as unique ref for handling on grid animations -->
                <div
                  :ref="setItemRef"
                  :class="[navState.isGridMode ? 'grid-cols-2' : 'grid-cols-1']"
                  class="grid mt-4 w-full gap-4"
                >
                  <!-- Here i use bus-card components -->
                  <BusCard
                    @click="performSelect(formatArrival(arrival))"
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
        <!-- Right panel and MAP -->
        <div
          :class="[isMobileMapActive ? 'left-0' : 'left-full']"
          class="
            absolute
            md:left-0
            w-full
            h-full
            md:relative md:w-auto md:h-auto md:flex-1
            transition-all
            duration-500
          "
        >
          <div class="relative w-full h-full">
            <div
              v-if="isMobile"
              class="absolute top-0 left-0 z-50 w-full p-5 pt-10 bg-main"
            >
              <div @click="isMobileMapActive = false" class="cursor-pointer">
                <BackIcon class="stroke-white" />
              </div>
            </div>
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
                  :ref="setMarkerRef"
                  :key="m.bus"
                  v-for="(m, i) in formatArrivals"
                  :position="m.position"
                  :clickable="true"
                  :icon="{
                    url: isSelected(m.bus)
                      ? mapPointSpriteOpen
                      : mapPointSprite,
                    scaledSize: {
                      width: isSelected(m.bus) ? 25 : 20,
                      height: isSelected(m.bus) ? 25 : 20,
                    },
                  }"
                  @click="performSelect(m)"
                >
                  <GMapInfoWindow
                    :closeclick="true"
                    :opened="isSelected(m.bus)"
                  >
                    <transition name="slide" appear>
                      <div
                        v-show="isSelected(m.bus) && isToolTipVisible"
                        :class="[
                          !isSelected(m.bus) ? 'opacity-0' : 'opacity-100',
                        ]"
                        :key="m.bus + i"
                        class="flex absolute -top-12 -left-3"
                      >
                        <div
                          class="
                            shadow-lg
                            text-md
                            font-bold
                            rounded-sm
                            text-center
                            items-center
                            w-8
                            bg-main
                            text-white
                          "
                        >
                          <p class="py-2">{{ m.line }}</p>
                        </div>
                        <transition name="slideRight">
                          <div
                            v-show="isSelected(m.bus) && isToolTipGapVisible"
                            class="ml-2 p-2 shadow-lg rounded-sm bg-white"
                          >
                            <p
                              class="
                                text-main
                                whitespace-nowrap
                                text-md
                                font-bold
                                capitalize
                              "
                            >
                              {{ m.destination.toLowerCase() }}
                            </p>
                          </div>
                        </transition>
                      </div>
                    </transition>
                  </GMapInfoWindow>
                </GMapMarker>
              </GMapCluster>
            </GMapMap>
          </div>
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

.slide-enter-active {
  animation: fadeInUp;
  animation-duration: 0.5s;
}

.slideRight-enter-active {
  animation: fadeInLeft;
  animation-duration: 0.5s;
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
