import { math } from "./math.js"

export function createWorld() {
  const world = {
    members: [],
    context: null,
    lastUpdated: null,
    update: function(timeElapsed) {
      const canvas = this.context.canvas
      this.context.clearRect(0, 0, canvas.width, canvas.height)
      
      for (const member of this.members) {
        if ("position" in member) {
          if ("collide" in member) {
            if (member.position.get([0]) < 0) {
              member.collide(math.matrix([1, 0]))
              math.subset(member.position, math.index(0), 1)
            }
            if (member.position.get([1]) < 0) {
              member.collide(math.matrix([0, 1]))
              math.subset(member.position, math.index(1), 1)
            }
            if (member.position.get([0]) > canvas.width) {
              member.collide(math.matrix([-1, 0]))
              math.subset(member.position, math.index(1), canvas.width - 1)
            }
            if (member.position.get([1]) > canvas.height) {
              member.collide(math.matrix([0, -1]))
              math.subset(member.position, math.index(1), canvas.height - 1)
            }
          }
        }
        if ("move" in member) member.move(timeElapsed)
        if ("draw" in member) member.draw(this.context)
      }
    }
  }
  
  return world
}