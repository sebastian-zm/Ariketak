import { math } from "./lib/math.js"
import { createMovingSquare } from "./lib/moving-square.js"
import { createWorld } from "./lib/world.js"
const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const world = createWorld()
const square = createMovingSquare()

let lastUpdated = null
let mouseDown = false
let mousePosition = null

world.members = [square]
world.context = context

resizeCanvas()
requestAnimationFrame(loop)

addEventListener("resize", resizeCanvas)
addEventListener("mousedown", () => mouseDown = true)
addEventListener("mouseup", () => mouseDown = false)
addEventListener("mousemove", setMousePosition)

function loop(timestamp) {
  lastUpdated ??= timestamp
  updateVelocity()
  world.update((timestamp - lastUpdated) / 1000)
  lastUpdated = timestamp
  requestAnimationFrame(loop)
}

function resizeCanvas() {
  canvas.height = document.documentElement.clientHeight
  canvas.width = document.documentElement.clientWidth
}

function updateVelocity() {
  if (mousePosition !== null && mouseDown) {
    square.velocity = math.map(math.subtract(mousePosition, square.position), v => v * 10)
    square.acceleration = math.matrix([0, 0])
  } else {
    square.acceleration = math.matrix([0, 2800])
  }
}

function setMousePosition(event) {
  const rectangle = canvas.getBoundingClientRect()
  const x = event.clientX - rectangle.left
  const y = event.clientY - rectangle.top
  mousePosition = math.matrix([x, y])
}
