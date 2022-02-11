<script setup lang="ts">
defineProps(['user'])
</script>

<template>
  <div class="w-full transition-all hover:scale-105 duration-500 cursor-pointer">
    <div
      class="w-full mix-blend-luminosity bg-contain bg-main"
      :style="{ backgroundImage: `url(${user.picture})` }"
    >
      <img class="w-full opacity-0" :src="user.picture" />
    </div>
    <div class="mt-5">
      <h1 class="text-white text-xl font-bold">
        {{ user.first }} {{ user.last }}
      </h1>
      <h2 class="text-gray-400 font-thin text-sm">
        {{ user.position }}
      </h2>
    </div>
  </div>
</template>