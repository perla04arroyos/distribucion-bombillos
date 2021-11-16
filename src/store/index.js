import { createStore } from 'vuex'

export default createStore({
  state: {
    DefaultRooms: [[0,0,0,1,0,1,1,1],[0,1,0,0,0,0,0,0],[0,1,0,0,0,1,1,1],[0,1,1,1,1,0,0,0],[0,1,0,0,1,0,0,0],[0,1,0,0,1,0,1,0],[0,1,0,1,1,0,1,0],[0,0,0,0,1,0,0,0],[0,1,1,0,1,1,0,1],[0,0,0,0,1,0,0,0],[1,0,0,1,0,0,1,1],[0,0,1,0,0,0,0,0]],
    Rooms: []
  },
  mutations: {   
    setRooms(state, payload){
      state.Rooms.push(payload)
    },
    cleanRooms(state, payload){
      state.Rooms = payload
    },
    setRoomIluminated(state, payload){
      state.Rooms[payload.positions.rowPosition][payload.positions.colPosition].light = payload.light;
      state.Rooms[payload.positions.rowPosition][payload.positions.colPosition].lightBulb = payload.lightBulb;
    }
  },
  actions: {
    setRooms({ commit }, strMatrix){    
      const matrix = JSON.parse(strMatrix); 

      matrix.forEach(row => {
        let rowRooms = []

        row.forEach(item => {
          let wallExists = false
          if(item == 1) wallExists = true

          rowRooms.push({wall: wallExists, light: false, lightBulb: false})
        })

        commit('setRooms', rowRooms)
      })
    },
    cleanRooms({commit}, emptyArray){
      commit('cleanRooms', emptyArray)
    },
    setRoomIluminated({ commit }, room){
      commit('setRoomIluminated', room)
    }
  }
})
