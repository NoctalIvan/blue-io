let target = null
let line = null

const drawLine = ({x, y}) => {
    if(!line) {
        line = new PIXI.Graphics()
        app.stage.addChild(line)
    } else {
        line.clear()
    }

    const myBoat = window.world.boats[UNIQUE_ID]
    line.x = myBoat.position.x
    line.y = myBoat.position.y
    line.lineStyle(1, 0xffffff)
    line.lineTo(x - line.x, y - line.y)
}

const createTarget = ({x, y}) => {
    console.log({x, y})
    target = PIXI.Sprite.from(textures.target)
    target.width = 20
    target.height = 20
    target.x = x
    target.y = y
    target.anchor.set(0.5)
    app.stage.addChild(target)

    drawLine({x, y})
}

const moveTarget = ({x, y}) => {
    target.alpha = 1
    target.x = x
    target.y = y

    drawLine({x, y})
}

const hideTarget = () => {
    target.alpha = 0
    line.alpha = 0
}