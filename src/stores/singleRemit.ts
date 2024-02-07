import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRemitStore = defineStore('counter', () => {
  const remitCur = ref('')
  // const doubleCount = computed(() => count.value * 2)
  function changeRemitCur(value:string) {
    remitCur.value = value
  }

  // return { remitCur, doubleCount, increment }
  return { remitCur,changeRemitCur }
})
