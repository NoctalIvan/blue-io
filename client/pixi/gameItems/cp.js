const cps = {}

const createCp = (cp) => {
    const sprite = PIXI.Sprite.from(textures.cp)
    sprite.height = 70
    sprite.width = 70
    sprite.x = cp.position.x
    sprite.y = cp.position.y
    sprite.anchor.set(0.5)
    app.stage.addChild(sprite)

    cps[cp.id] = sprite
}