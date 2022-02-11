import { defineStore } from 'pinia'
import { getUsers } from '../services/users.service'

export const useStore = defineStore('users', {
  state() {
    return {
      maxUsers: 60,
      usage: 0,
      users: [],
    }
  },
  actions: {
    async fetchUsers(quantity: number) {
      if (this.usage >= this.maxUsers) return;
      const users = await getUsers(quantity)
      this.users = [...this.users, ...users as never[]]
      this.usage += quantity;
    },
  }
})