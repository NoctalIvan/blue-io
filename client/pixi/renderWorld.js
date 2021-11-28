const renderWorld = () => {
    if(!window.world) {
        return
    }

    const myBoat = window.world.boats[UNIQUE_ID]
    const rockingPixel = new Date().getSeconds() % 2 

    // place cps
    if(!cps.a) {
        createCp(window.world.cps.a)
    }

    // place boats
    const deltaTime = +new Date() - window.world.lastRender
    for(let boatId in window.world.boats) {
        const boat = window.world.boats[boatId]
        const renderBoat = boats[boatId]

        
        if(!renderBoat) {
            createBoat(boat)
        } else {
            moveBoat(boat, renderBoat, deltaTime, rockingPixel)
        }
    }

    // place trash
    for(let trashId in window.world.trashes) {
        const trash = window.world.trashes[trashId]
        const renderTrash = trashes[trashId]
        
        if(!renderTrash) {
            createTrash(trash)
        } else {
            renderTrash.y = trash.position.y + rockingPixel
        }
    }

    // rm trash
    for(let trashId in trashes) {
        if(!window.world.trashes[trashId]) {
            deleteTrash(trashId)
        }
    }

    // update messages & loaders
    updateMessages()
    updateLoaders()
}