// computes one tick of game loop depending on DeltaTime
const { squareCollision, roundCollision } = require('./collisionHelper')
const CONSTANTS = require('./constants')

module.exports = (world, deltaTime) => {
    const newWorld = JSON.parse(JSON.stringify(world))
    newWorld.tick += 1

    // boat move
    for(let boat of Object.values(newWorld.boats)) {
        const dx = boat.direction.x - boat.position.x
        const dy = boat.direction.y - boat.position.y
        
        if(dx === 0 && dy === 0) {
            continue
        }

        // distance to position
        const totalDistance = Math.sqrt(dx * dx + dy * dy)
        const boatDistance = deltaTime * boat.speed * CONSTANTS.boatBaseSpeed
        if(totalDistance <= boatDistance) {
            boat.position.x = boat.direction.x
            boat.position.y = boat.direction.y
            boat.momentum = {x: 0, y: 0}
        } else {
            const distanceFraction = boatDistance / totalDistance
            boat.position.x += distanceFraction * dx
            boat.position.y += distanceFraction * dy
            boat.momentum = {x: distanceFraction * dx, y: distanceFraction * dy}
        }

        // todo : manage following cargo
        
    }

    // trash collection
    for(let boat of Object.values(newWorld.boats)) {
        for(let trash in Object.values(newWorld.trashs)) {
            console.log(trash)
            if(roundCollision(boat.position, trash.position, CONSTANTS.boatCollectionRadius)) {
                boat.trash.push(trash)
                delete world.trash[trash]
            }
        }
    }

    // trash deposit
    for(let boat of Object.values(newWorld.boats)) {
        for(let cp of newWorld.cps) {
            if(roundCollision(boat.position, cp.position, CONSTANTS.boatDepositRadius)) {
                boat.trash = []
                // todo : count score
            }
        }
    }


    // tick
    newWorld.lastRender = +new Date()
    return newWorld
}