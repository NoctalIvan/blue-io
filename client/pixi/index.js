// Create the sprite and add it to the stage
setTimeout(() => {
    // create boat now
    const newBoat = {
        position: {x: 100, y: 100},
        direction: {x: 100, y: 100},
        id: UNIQUE_ID,
        trashes: [],
        speed: 20, // todo : change
    }
    // createBoat(newBoat)
    socket_createBoat(newBoat)
}, 2000)

app.renderer.view.addEventListener('click', function(e) {
    // place target
    if(target) {
        moveTarget(e)
    } else {
        createTarget(e)
    }

    socket_sendNewDirection({id: UNIQUE_ID, x: e.x, y: e.y})
})

// render loop
setTimeout(() => {
    app.ticker.add(() => {
        renderWorld()
    });
}, 2000)
