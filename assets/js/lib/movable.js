import { math } from "./math.js"

export function createMovable() {
  const movable = {
    position: math.matrix([0, 0]),
    velocity: math.matrix([0, 0]),
    acceleration: math.matrix([0, 0]),
    
    move(timeElapsed) {
      this.velocity = math.add(this.velocity, math.map(this.acceleration, a => a * timeElapsed))
      this.position = math.add(this.position, math.map(this.velocity, v => v * timeElapsed))
    },

    collide(normal) {
      const velocityDotNormal = math.dot(this.velocity, normal)
      if (velocityDotNormal < 0) {
        const factor = 2 * velocityDotNormal / math.dot(normal, normal)
        this.velocity = math.subtract(this.velocity, math.map(normal, n => factor * n))
      }
    }
  }
  
  return movable
}