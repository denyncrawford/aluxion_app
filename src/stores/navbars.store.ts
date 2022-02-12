import { defineStore } from 'pinia'

export const useStore = defineStore('navbars', {
  state() {
    return {
      isMainNavbarOpen: true,
    }
  },
})