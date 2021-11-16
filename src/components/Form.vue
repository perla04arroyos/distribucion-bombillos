<template>
  <form class="d-flex">
    <label class="text-reader me-2">
      Leer Matriz
      <input type="file" @change="loadMatrixFromFile" />
    </label>
    <button type="button" class="btn btn-dark" @click="turnOnLights">
      Encender luces
    </button>
  </form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Form",
  data() {
    return {
      wallNeeded: Boolean,
      dataRoom: Object,
      updateRoom: Object
    };
  },
  computed: {
    ...mapState(["Rooms"])
  },
  methods: {
    ...mapActions(["setRooms", "cleanRooms", "setRoomIluminated"]),
    loadMatrixFromFile(ev) {
      this.cleanRooms([]);
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.setRooms(e.target.result);
      reader.readAsText(file);
    },
    turnOnLights() {
      for (var k = 4; k >= 0 ; k--) {
        for (var i = 0; i < this.Rooms.length; i++) {
          for (var j = 0; j < this.Rooms[i].length; j++) {
            if (!this.Rooms[i][j].wall) this.wallNeeded = false;
            if (this.Rooms[i][j].wall) this.wallNeeded = true;

            if (!this.Rooms[i][j].light) {
              this.dataRoom = {
                rowPosition: i,
                colPosition: j,
              }
              let countDirections = this.getAvailableDirections(i,j);
              if (countDirections == k) {
                this.setRoomIluminated({
                  positions: this.dataRoom,
                  light: true,
                  lightBulb: true,
                });
                this.setDesiredDirections(i,j);
              }
            }
          }
        }
      }
    },
    getAvailableDirections(i,j) {
      let countDirections = 0;

      if (this.Rooms[i - 1] != undefined) {
        countDirections += this.getIncrementalByOne(i - 1, j)
      }

      if (this.Rooms[i + 1] != undefined) {
        countDirections += this.getIncrementalByOne(i + 1, j)
      }

      if (this.Rooms[i][j - 1] != undefined) {
        countDirections += this.getIncrementalByOne(i, j - 1)
      }

      if (this.Rooms[i][j + 1] != undefined) {
        countDirections += this.getIncrementalByOne(i, j + 1)
      }

      return countDirections
    },
    getIncrementalByOne(i, j) {
      return (this.Rooms[i][j].wall == this.wallNeeded && !this.Rooms[i][j].light) ? 1 : 0
    },
    setDesiredDirections(i,j) {
      if (this.Rooms[i - 1] != undefined) {
        this.iluminateRoomByRow(-1)
      }

      if (this.Rooms[i + 1] != undefined) {
        this.iluminateRoomByRow(1)
      }

      if (this.Rooms[i][j - 1] != undefined) {
        this.iluminateRoomByColumn(-1)
      }

      if (this.Rooms[i][j + 1] != undefined) {
        this.iluminateRoomByColumn(1)
      }
    },
    iluminateRoomByRow(i) {
      let iIncremental = this.dataRoom.rowPosition + i;

      while (this.Rooms[iIncremental] != undefined) {
        if (!this.Rooms[iIncremental][this.dataRoom.colPosition].wall == this.wallNeeded) break;

        if (this.Rooms[iIncremental][this.dataRoom.colPosition].wall == this.wallNeeded && !this.Rooms[iIncremental][this.dataRoom.colPosition].light) {
          this.updateRoom = {
              rowPosition: iIncremental,
              colPosition: this.dataRoom.colPosition
          }
          this.setRoomIluminated({ positions: this.updateRoom, light: true, lightBulb: false });
        }

        iIncremental += i;
      }
    },
    iluminateRoomByColumn(j) {
      let jIncremental = this.dataRoom.colPosition + j;

      while (this.Rooms[this.dataRoom.rowPosition][jIncremental] != undefined) {
        if (!this.Rooms[this.dataRoom.rowPosition][jIncremental].wall == this.wallNeeded) break;

        if (this.Rooms[this.dataRoom.rowPosition][jIncremental].wall == this.wallNeeded && !this.Rooms[this.dataRoom.rowPosition][jIncremental].light) {
            this.updateRoom = {
                rowPosition: this.dataRoom.rowPosition,
                colPosition: jIncremental
            }
          this.setRoomIluminated({ positions: this.updateRoom, light: true, lightBulb: false });
        }
        jIncremental += j;
      }
    },
  },
};
</script>

<style>
.text-reader {
  position: relative;
  overflow: hidden;
  display: inline-block;

  border: 1px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader:hover {
  background-color: black;
  color: white;
  transition: 300ms;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>