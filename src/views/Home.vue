<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import { useStore } from '../stores/users.store'
import { useRoute } from 'vue-router'
import Aluxioner from '../components/Aluxioner.vue'
import UserModal from '../components/UserModal.vue'

// States

const users = useStore()
const route = useRoute()
const modalState = reactive({
  data: {
    toHome: '',
    toAluxion: '',
    name: '',
  },
  active: ref(false),
})
// Watchers

watch(modalState, (value) => {
  value.active
    ? document.body.classList.add('overflow-hidden')
    : document.body.classList.remove('overflow-hidden')
})

// Refs

const scrollComponent = ref(null)

// Methods

function openModal(user: any) {
  modalState.data = user
  modalState.active = true
}

// Hooks

onMounted(() => {
  users.fetchUsers(10)
  window.addEventListener('scroll', (e) => {
    if (route.name !== 'Home') return
    let element = scrollComponent.value
    if (element.getBoundingClientRect().bottom < window.innerHeight + 10) {
      users.fetchUsers(10)
    }
  })
})
</script>

<template>
  <div ref="scrollComponent" class="px-20 bg-main py-20 absolute w-full">
    <user-modal @close="modalState.active = false" :state="modalState" />
    <section>
      <h3 class="text-gray-500 font-bold">Team</h3>
      <h1 class="text-white mt-2 text-4xl">Aluxioners</h1>
      <div class="grid w-full gap-6 grid-cols-6 mt-12">
        <transition-group appear name="fade-card">
          <aluxioner
            :key="user.id"
            v-for="user in users.entries"
            :user="user"
            @click="openModal(user)"
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