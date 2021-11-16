<template>
  <div class="room" :style="{ 'background-color': bgColor, 'border-color': borderColor }">
    <img src="../assets/light-bulb.png" alt="Light Bulb" class="light-bulb"  v-show="room.lightBulb">
  </div>
</template>

<script>
export default {
    name: 'LightBulb',
    props: { room: Object },
    computed: {
      bgColor(){
        return this.room.light ? 'lightyellow' : 'white'
      },
      borderColor(){
        return this.room.wall ? 'black' : 'lightyellow'
      }
    }
}
</script>

<style>
.room{
  padding: 1px;
  margin: 1px;
  width: 40px;
  height: 40px;
  border-width: 1px;
  border-style: solid;
}

.light-bulb{
  width: 30px;
  height: 30px;
}
</style>