import { defineStore } from 'pinia'
import { getUsers } from '../services/users.service'
import fakeUsers from '../fake_data/users.json'

export const useStore = defineStore('users', {
  state() {
    return {
      maxUsers: 60,
      usage: 0,
      entries: fakeUsers,
    }
  },
  actions: {
    async fetchUsers(quantity: number) {
      if (this.usage >= this.maxUsers) return;
      const users = await getUsers(quantity)
      this.entries = [...this.entries, ...users]
      this.usage += quantity;
    },
  }
})