<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useStore } from '../stores/users.store'
import Aluxioner from '../components/Aluxioner.vue'
import UserModal from '../components/UserModal.vue'
const users = useStore()
const scrollComponent = ref(null)
onMounted(() => {
  users.fetchUsers(10)
  window.addEventListener('scroll', (e) => {
    let element = scrollComponent.value

    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      users.fetchUsers(10)
    }
  })
})
</script>

<template>
  <div ref="scrollComponent" class="mx-20 py-20">
    <user-modal />
    <section>
      <h3 class="text-gray-500 font-bold">Team</h3>
      <h1 class="text-white mt-2 text-4xl">Aluxioners</h1>
      <div class="grid w-full gap-6 grid-cols-6 mt-12">
        <transition-group appear name="fade-card">
          <aluxioner
            :key="user.id"
            v-for="user in users.entries"
            :user="user"
          />
        </transition-group>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-card-enter-active {
  animation: fadeInUp;
  animation-duration: 0.5s;
}
</style>