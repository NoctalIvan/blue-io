const UNIQUE_ID = "" + Math.random()

let app = new PIXI.Application({
    width: 1000,
    height: 625,
    backgroundColor: 0x337ab7
})

document.getElementById('canvas-cnt').appendChild(app.view)

// Create the sprite and add it to the stage
let target = null

const boats = {}
const trashs = {}
const createBoat = (boat) => {
    const sprite = PIXI.Sprite.from(textures.cargo)
    sprite.width = 30
    sprite.height = 34
    sprite.x = boat.position.x
    sprite.y = boat.position.y
    sprite.anchor.set(0.5)
    app.stage.addChild(sprite)

    boats[boat.id] = sprite
}

const createTrash = (trash) => {
    const sprite = PIXI.Sprite.from(textures.trash)
    sprite.width = 20
    sprite.height = 30
    sprite.x = trash.position.x
    sprite.y = trash.position.y
    sprite.anchor.set(0.5)
    app.stage.addChild(sprite)

    trashs[trash.id] = sprite
}

const deleteTrash = (trashId) => {
    app.stage.removeChild(trashs[trashId])
    delete trashs[trashId]
}

setTimeout(() => {
    // create boat now
    const newBoat = {
        position: {x: 100, y: 100},
        direction: {x: 100, y: 100},
        id: UNIQUE_ID,
        speed: 2,
    }
    // createBoat(newBoat)
    socket_createBoat(newBoat)
}, 2000)

app.renderer.view.addEventListener('click', function(e) {
    // place target
    if(target) {
        target.x = e.x
        target.y = e.y
    } else {
        target = PIXI.Sprite.from(textures.target)
        target.width = 20
        target.height = 20
        target.x = e.x
        target.y = e.y
        target.anchor.set(0.5)
        app.stage.addChild(target)
    }

    socket_sendNewDirection({id: UNIQUE_ID, x: e.x, y: e.y})
})

const renderWorld = () => {
    if(!window.world) {
        return
    }

    // place boats
    const deltaTime = +new Date() - window.world.lastRender
    for(let boatId in window.world.boats) {
        const boat = window.world.boats[boatId]
        const renderBoat = boats[boatId]

        
        if(!renderBoat) {
            createBoat(boat)
        } else {
            if(!boat.momentum) {
                renderBoat.x = boat.position.x
                renderBoat.y = boat.position.y
            } else {
                renderBoat.x = boat.position.x + boat.momentum.x * (deltaTime / 200)
                renderBoat.y = boat.position.y + boat.momentum.y * (deltaTime / 200)
            }
        }
    }

    // place trash
    for(let trashId in window.world.trash) {
        const trash = window.world.trash[trashId]
        const renderTrash = trashs[trashId]

        if(!renderTrash) {
            createTrash(trash)
        }
    }

    // rm trash
    for(let trashId in trashs) {
        if(!window.world.trash[trashId]) {
            deleteTrash(trashId)
        }
    }
}

// render loop
setTimeout(() => {
    app.ticker.add(() => {
        renderWorld()
    });
}, 2000)
