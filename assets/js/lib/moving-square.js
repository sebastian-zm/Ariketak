import { createMovable } from "./movable.js"
import { math } from "./math.js"

export function createMovingSquare() {
  
  const square = createMovable()
  
  Object.assign(square, {
    color: "#000000",
    size: 10,
    
    draw: function(context) {
      context.moveTo(this.position.get([0]), this.position.get([1]))
      context.fillStyle = this.color
      context.fillRect(math.round(this.position.get([0])), math.round(this.position.get([1])), this.size, this.size)
    },
  })
  
  return square
}