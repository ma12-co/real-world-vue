<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard :key="event.id" v-for="event in events" :event="event" />
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import EventService from '../services/EventService.js'
export default {
  data() {
    return {
      events: []
    }
  },
  components: {
    EventCard
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(e => {
        console.log('there was an error: ' + e)
      })
  }
}
</script>

<style lang="scss" scoped></style>
