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
    }

    // trash collection
    for(let boat of Object.values(newWorld.boats)) {
        if(boat.type !== 'cargo' || boat.trashes >= 3) {
            continue
        }

        for(let trash of Object.values(newWorld.trashes)) {
            if(roundCollision(boat.position, trash.position, CONSTANTS.boatCollectionRadius)) {
                boat.trashes = (boat.trashes || 0) + 1
                delete newWorld.trashes[trash.id]
            }
        }
    }

    // trash deposit
    for(let boat of Object.values(newWorld.boats)) {
        if(!boat.trashes) {
            continue
        }

        for(let cp of Object.values(newWorld.cps)) {
            if(roundCollision(boat.position, cp.position, CONSTANTS.boatDepositRadius)) {
                console.log('SCORE')
                boat.lastSuccess = {
                    id: uuid(),
                    score: boat.trashes    
                }
                boat.trashes = 0
            }
        }
    }

    // trash stealing
    for(let fregate of Object.values(newWorld.boats)) {
        if(fregate.type != 'fregate' || fregate.trashes > 0) {
            continue
        }

        for(let cargo of Object.values(newWorld.boats)) {
            if(cargo.type != 'cargo' || cargo.steal || cargo.trashes <= 0) {
                continue
            }

            if(Object.values(newWorld.boats).find(police => 
                police.type == 'police' &&
                roundCollision(police.position, cargo.position, 70)
            )) {
                continue
            }

            if(roundCollision(fregate.position, cargo.position, CONSTANTS.boatCollectionRadius * 2)) {
                console.log('STEAL')
                cargo.steal = {
                    id: uuid(),
                    since: +new Date(),
                    by: fregate.id
                }
            }
        }
    }

    for(let cargo of Object.values(newWorld.boats)) {
        if(!cargo.steal) {
            continue
        }

        const fregate = newWorld.boats[cargo.steal.by]
        if(+new Date() - cargo.steal.since > 2000) {
            console.log(fregate)
            cargo.trashes -= 1
            fregate.trashes = (fregate.trashes || 0) + 1
            cargo.steal = null
            console.log('STEAL END')
        }
    }

    // spawn trash
    while(Object.values(newWorld.trashes).length < 7) {
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