const speedTypes = {
    cargo: 20, // TODO ; CHANGE
    fregate: 50,
    police: 40
}

const onBoatSelection = (type, name) => {
    const newBoat = {
        position: {x: 100, y: 100},
        direction: {x: 100, y: 100},
        name,
        type,
        id: UNIQUE_ID,
        trashes: 0,
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
