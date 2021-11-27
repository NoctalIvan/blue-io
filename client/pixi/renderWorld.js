const renderWorld = () => {
    if(!window.world) {
        return
    }

    const myBoat = window.world.boats[UNIQUE_ID]

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
    for(let trashId in window.world.trashes) {
        const trash = window.world.trashes[trashId]
        const renderTrash = trashes[trashId]
        
        if(!renderTrash) {
            createTrash(trash)
        }
    }

    // rm trash
    for(let trashId in trashes) {
        if(!window.world.trashes[trashId]) {
            deleteTrash(trashId)
        }
    }
}