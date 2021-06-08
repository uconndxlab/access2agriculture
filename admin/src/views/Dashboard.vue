<template>
  <div class="about">
    <h1>This is the admin dashboard page</h1>

    <button @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
