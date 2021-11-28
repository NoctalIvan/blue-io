let loaders = []

const displayLoader = (x, y, color = 0x00ff00) => {
    var semicircle = new PIXI.Graphics()
    semicircle.lineStyle(6, color)
    semicircle.arc(0, 0, 10, 0, 0 * Math.PI)
    semicircle.position = {x, y};
    app.stage.addChild(semicircle);

    loaders.push({
        since: new Date(),
        semicircle,
    })
}

const updateLoaders = () => {
    loaders.forEach((loader, i) => {
        const dt = new Date() - loader.since
        if(dt > 5000) {
            app.stage.removeChild(loader.semicircle)
            loaders = [...loaders.slice(0, i), ...loaders.slice(i+1, loaders.length)]
            return
        }
        
        loader.semicircle.arc(0, 0, 10, 0, (dt/5000) * 2 * Math.PI)
    })
}