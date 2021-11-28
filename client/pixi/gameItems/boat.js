const boats = {}
const circles = {}
const names = {}

const createBoat = (boat) => {
    console.log(boat)
    const sprite = PIXI.Sprite.from(textures[boat.type])
    sprite.width = 50
    sprite.height = 34
    sprite.x = boat.position.x
    sprite.y = boat.position.y
    sprite.anchor.set(0.5)
    app.stage.addChild(sprite)

    boats[boat.id] = sprite

    if(boat.type == 'police') {
        const circle = new PIXI.Graphics()
        circle.beginFill(0xffffff, 0.2)
        circle.lineStyle(2, 0x000000, 0.2)
        circle.drawCircle(0, 0, 70)
        circle.endFill()
        app.stage.addChild(circle)
        circles[boat.id] = circle
    }

    const name = new PIXI.Text(boat.name || 'anony-mousse', {
        fontFamily : 'monospace',
        fontSize: 12,
        fill : 0xffffff, 
        align : 'center'
    })
    name.anchor.set(0.5)

    app.stage.addChild(name)
    names[boat.id] = name
}

const deleteBoat = (boatId) => {
    app.stage.removeChild(boats[boatId])
    delete boats[boatId]

    const circle = circles[boatId]
    if(circle) {
        app.stage.removeChild(circle)
        delete circle[boatId]
    }

    const name = names[boatId]
    if(name) {
        app.stage.removeChild(name)
        delete name[boatId]
    }
}

const moveBoat = (boat, renderBoat, deltaTime, rockingPixel = 0) => {
    if(!boat.momentum) {
        renderBoat.x = boat.position.x
        renderBoat.y = boat.position.y + rockingPixel
    } else {
        renderBoat.x = boat.position.x + boat.momentum.x * (deltaTime / 200) * 5
        renderBoat.y = boat.position.y + boat.momentum.y * (deltaTime / 200) * 5 + rockingPixel
    }

    const circle = circles[boat.id]
    if(circle) {
        circle.x = renderBoat.x
        circle.y = renderBoat.y
    }

    const name = names[boat.id]
    if(name) {
        name.x = renderBoat.x
        name.y = renderBoat.y - 30
    }
}