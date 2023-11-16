import { math } from "./math.js"
import { createMovable } from "./movable.js"

export function createMovingCircle() {
  const circle = createMovable()
  
  Object.assign(circle, {
    color: "#ff0000",
    radius: 5,
    
    draw: function(context) {
      context.fillStyle = this.color
      context.moveTo(math.round(this.position.get([0])), math.round(this.position.get([1])))
      context.arc(math.round(this.position.get([0])), math.round(this.position.get([1])), this.radius, 0, math.tau) // math.tau is 2*pi
      context.fill()
    },
  })
  
  return circle
}