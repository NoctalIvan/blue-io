const boats = {}
const circles = {}
const names = {}
const messageIds = {}

const createBoat = (boat) => {
    console.log(boat)
    const sprite = PIXI.Sprite.from(textures[boat.type])
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
        fill : boat.type == 'cargo' ? 0xffffff : boat.type == 'fregate' ? 0xff0000 : 0x0000ff, 
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

        if(boat.momentum.x > 0 && renderBoat.scale.x > 0) {
            renderBoat.scale.x *= -1
        } else if(boat.momentum.x < 0 && renderBoat.scale.x < 0) {
            renderBoat.scale.x *= -1
        }
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

    if(boat.steal && !messageIds[boat.steal.id]) {
        messageIds[boat.steal.id] = true
        displayLoader(boat.position.x, boat.position.y, 0xff0000)
    }

    if(boat.lastSuccess && !messageIds[boat.lastSuccess.id]) {
        messageIds[boat.lastSuccess.id] = true
        displayMessage(`secured ${boat.lastSuccess.score} trash !`, boat.position.x, boat.position.y - 20)
    }

    // trash updates
    names[boat.id].text = `${boat.name || 'anony-mousse'} (${boat.trashes || 0})`
    if(boat.type == 'fregate') {
        renderBoat.texture = textures['fregate' + (boat.trashes || '')]
    } else if (boat.type == 'cargo') {
        renderBoat.texture = textures['cargo' + (boat.trashes || '')]
    }
}