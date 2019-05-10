<template>
  <div>
    <h1>Evens for {{ user.user.name }}</h1>
    <EventCard :key="event.id" v-for="event in event.events" :event="event" />
    <p>Page {{ page }} of {{ numOfPages }}</p>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
    </template>
    |
    <template v-if="page < numOfPages">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    numOfPages() {
      return this.$store.state.event.numberOfPages
    },
    ...mapState(['event', 'user'])
  }
}
</script>

<style lang="scss" scoped></style>
