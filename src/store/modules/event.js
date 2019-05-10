import EventService from '../../services/EventService'

export const namespaced = true

export const state = {
  events: [],
  numberOfPages: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_NUMBEROFPAGES(state, eventsNum) {
    state.numberOfPages = Math.ceil(parseInt(eventsNum) / 3)

    console.log(state.numberOfPages)
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
      })
      .catch(e => console.log('there was an error' + e))
  },

  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit('SET_NUMBEROFPAGES', response.headers['x-total-count'])

        commit('SET_EVENTS', response.data)
      })
      .catch(e => {
        console.log('there was an error: ' + e)
      })
  },
  fetchEvent({ commit, getters }, id) {
    let event = getters.getEventByID(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('there was an error:' + error.response)
        })
    }
  }
}

export const getters = {
  catLength: state => {
    return state.categories.length
  },
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  activeTodosCount: state => {
    return state.todos.filter(todo => !todo.done).length
  },
  getEventByID: state => id => {
    return state.events.find(event => event.id === id)
  }
}
