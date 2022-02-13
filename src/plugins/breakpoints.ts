import { ref } from 'vue'

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
}

export const isMobile = ref(window.innerWidth < screens.md)

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < screens.md
})