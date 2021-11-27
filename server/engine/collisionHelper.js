const squareCollision = (coords1, coords2, distance) => {
    return Math.abs(coords1.x - coords2.x) <= distance && Math.abs(coords1.y - coords2.y) <= distance
}

const roundCollision = (coords1, coords2, distance) => {
    return Math.sqrt((coords1.x - coords2.x) * (coords1.x - coords2.x) + (coords1.y - coords2.y) * (coords1.y - coords2.y)) <= distance
}

module.exports = {squareCollision, roundCollision}