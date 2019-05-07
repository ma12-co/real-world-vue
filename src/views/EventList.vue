<template>
  <div>
    <h1>Event Listing</h1>
    <router-link :to="{ name: 'event-show', params: { id: '1' } }"
      >Show event #1</router-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
