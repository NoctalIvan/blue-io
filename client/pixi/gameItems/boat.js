const boats = {}

const createBoat = (boat) => {
    const sprite = PIXI.Sprite.from(textures.cargo)
    sprite.width = 50
    sprite.height = 34
    sprite.x = boat.position.x
    sprite.y = boat.position.y
    sprite.anchor.set(0.5)
    app.stage.addChild(sprite)

    boats[boat.id] = sprite
}

const deleteBoat = (boatId) => {
    app.stage.removeChild(boats[boatId])
    delete boats[boatId]
}