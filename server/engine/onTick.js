// computes one tick of game loop depending on DeltaTime
const { squareCollision, roundCollision } = require('./collisionHelper')
const uuid = require('uuid').v4
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

        // todo : manage cargo
    }

    // trash collection
    for(let boat of Object.values(newWorld.boats)) {
        for(let trash of Object.values(newWorld.trashes)) {
            if(roundCollision(boat.position, trash.position, CONSTANTS.boatCollectionRadius)) {
                if(!boat.trashes) {
                    boat.trashes = []
                }

                boat.trashes.push(trash)
                delete newWorld.trashes[trash.id]
            }
        }
    }

    // trash deposit
    for(let boat of Object.values(newWorld.boats)) {
        if(!boat.trashes || Object.keys(boat.trashes).length == 0) {
            continue
        }

        for(let cp of Object.values(newWorld.cps)) {
            if(roundCollision(boat.position, cp.position, CONSTANTS.boatDepositRadius)) {
                console.log(boat.trashes)
                console.log('TODO / SCORE')
                boat.trashes = {}
            }
        }
    }

    // spawn trash
    while(Object.values(newWorld.trashes).length < 3) {
        const id = uuid()
        const type = Math.floor(Math.random() * 3) + 1
        newWorld.trashes[id] = {
            id,
            type,
            value: type == 1 ? 1 : type == 2 ? 3 : 5,
            position: {
                x: Math.random() * 800 + 100,
                y: Math.random() * 525 + 100,
            }
        }
    }

    // tick
    newWorld.lastRender = +new Date()
    return newWorld
}