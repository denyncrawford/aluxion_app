<script setup lang="ts">
import Aluxioner from '../components/Aluxioner.vue'
import { onMounted, ref } from 'vue'
import { useStore } from '../stores/users.store'
const users = useStore()
const scrollComponent = ref(null)
onMounted(() => {
  users.fetchUsers(10)
  window.addEventListener('scroll', (e) => {
    let element = scrollComponent.value;
    
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      users.fetchUsers(10)
    }
  })
})

</script>

<template>
  <div ref="scrollComponent" class="mx-20 py-20">
    <section>
      <h3 class="text-gray-500 font-bold">Team</h3>
      <h1 class="text-white mt-2 text-4xl">Aluxioners</h1>
      <div class="grid w-full gap-6 grid-cols-6 mt-12">
        <aluxioner :key="user.id" v-for="user in users.entries" :user="user" />
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>