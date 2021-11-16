<template>
  <Navbar />
  <div class="row" v-for="(rooms, i) in Rooms" :key="i">
      <Room v-for="(room, j) in rooms" :key="j" :room="room" />
  </div> 
</template>

<script>
import Navbar from './components/Navbar'
import Room from './components/Room'

import {mapState} from 'vuex'

export default {
  name: 'App',
  components: { Navbar, Room },
  computed: {
    ...mapState(['Rooms'])
  }
}
</script>

<style>
.row {
  display: flex;
  justify-content: center;
}
</style>
