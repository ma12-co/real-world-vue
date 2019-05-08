<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.name }}</p>
    <p>{{ getEventByID(2) }}</p>

    <ul>
      <li v-for="(category, index) in categories" :key="`${category}-${index}`">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    getEvent() {
      return this.$store.getters.getEventByID
    },
    ...mapGetters(['getEventByID']),
    ...mapState(['user', 'categories'])
  }
}
</script>

<style scoped></style>
