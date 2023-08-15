import { createStore } from 'vuex'

export default createStore({
  state: {
    all: [],  //{name, desc, max_date, done}
    filtered: [],
    doneFilter: null,
    base_url: '',
  },
  mutations: {
    setAll: (state, payload) => {
      state.all = payload;
      state.filtered = payload;
    },

    setFilter: (state, payload) => {
      state.doneFilter = payload;

      if (payload == null) {
        state.filtered = state.all;
        return;
      }
      
      const filter = state.all.filter((e) => e.Done == payload);

      state.filtered = filter;
      console.log(state.filtered);
    },

    newTask: (state, payload) => {
      state.all.push(payload);
    },

    deleteTask: (state, payload) => {
      const index = state.all.findIndex((item) => item.Id == payload);
      state.all.splice(index, 1);
    },

    markAsDone: (state, payload) => {
      state.all.forEach((task) => {
        if (task.Id == payload) {
          task.Done = true;
        }
      });
    }
  },
  actions: {
    newTask: ({ commit, state }, payload) => {
      commit('newTask', payload);
      commit('setFilter', state.doneFilter);
    },

    deleteTask: ({commit, state}, payload) => {
      commit('deleteTask', payload);
      commit('setFilter', state.doneFilter);
    },

    markAsDone: ({commit, state}, payload) => {
      commit('markAsDone', payload);
      commit('setFilter', state.doneFilter);
    }
  },
  modules: {
  }
});
