const onTick = require('./onTick')

let world = require('./world')
const getWorld = () => world

// game loop
let lastTick = +new Date()
const start = () => {
    setInterval(() => {
        const dt = +new Date() - lastTick
        lastTick = +new Date()

        world = onTick(world, dt)
    }, 1000/30)
}


module.exports = { start, getWorld }
