const speedTypes = {
    cargo: 2,
    fregate: 5,
    police: 4
}

const onBoatSelection = (type, name) => {
    const newBoat = {
        position: {x: 100, y: 100},
        direction: {x: 100, y: 100},
        name,
        type,
        id: UNIQUE_ID,
        trashes: [],
        speed: speedTypes[type]
    }

    socket_createBoat(newBoat)
}

app.renderer.view.addEventListener('click', function(e) {
    const myBoat = window.world.boats[UNIQUE_ID]
    if(!myBoat) {
        return
    }
    
    // place target
    if(target) {
        moveTarget({x: e.layerX, y: e.layerY})
    } else {
        createTarget({x: e.layerX, y: e.layerY})
    }

    socket_sendNewDirection({id: UNIQUE_ID, x: e.layerX, y: e.layerY})
})

// render loop
app.ticker.add(() => {
    renderWorld()
})
