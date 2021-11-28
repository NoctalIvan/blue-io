const trashes = {}

const createTrash = (trash) => {
    const sprite = PIXI.Sprite.from(textures['trash' + trash.type])
    sprite.x = trash.position.x
    sprite.y = trash.position.y
    sprite.anchor.set(0.5)
    app.stage.addChild(sprite)

    trashes[trash.id] = sprite
}

const deleteTrash = (trashId) => {
    app.stage.removeChild(trashes[trashId])
    delete trashes[trashId]
}