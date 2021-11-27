let target = null

const createTarget = ({x, y}) => {
    console.log({x, y})
    target = PIXI.Sprite.from(textures.target)
    target.width = 20
    target.height = 20
    target.x = x
    target.y = y
    target.anchor.set(0.5)
    app.stage.addChild(target)
}

const moveTarget = ({x, y}) => {
    target.alpha = 1
    target.x = x
    target.y = y
}

const hideTarget = () => {
    target.alpha = 0
}