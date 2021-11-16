<template>
  <Navbar />
  <div class="row" v-for="(rooms, i) in Rooms" :key="i">
      <Room v-for="(room, j) in rooms" :key="j" :room="room" />
  </div> 
</template>

<script>
import Navbar from './components/Navbar'
import Room from './components/Room'

import {mapState,mapActions} from 'vuex'

export default {
  name: 'App',
  components: { Navbar, Room },
  computed: {
    ...mapState(['Rooms','DefaultRooms'])
  },
  methods: {
    ...mapActions(['setRooms']),
  },
  created(){
      this.setRooms(JSON.stringify(this.DefaultRooms))
  }
}
</script>

<style>
.row {
  display: flex;
  justify-content: center;
}
</style>
