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
    const trash = trashes[trashId]
    displayMessage('+' + (trash.value || 1) + ' trash', trash.position.x, trash.position.y - 30)

    app.stage.removeChild(trash)
    delete trashes[trashId]
}