import { math } from "./math.js"

export function createMovable() {
  const movable = {
    position: math.matrix([0, 0]),
    velocity: math.matrix([0, 0]),
    acceleration: math.matrix([0, 0]),
    
    move(timeElapsed) {
      this.position = math.add(this.position, math.map(this.velocity, v => v * timeElapsed), math.map(this.acceleration, a => a * timeElapsed * timeElapsed / 2))
      this.velocity = math.add(this.velocity, math.map(this.acceleration, a => a * timeElapsed))
    },

    collide(normal, restitution = 1) {
      const velocityDotNormal = math.dot(this.velocity, normal)
      if (velocityDotNormal < 0) {
        const factor = 2 * velocityDotNormal / math.dot(normal, normal)
        this.velocity = math.map(math.subtract(this.velocity, math.map(normal, n => factor * n)), v => v * restitution)
      }
    }
  }
  
  return movable
}