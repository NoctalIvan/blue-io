const UNIQUE_ID = "" + Math.random()

let app = new PIXI.Application({
    width: 1000,
    height: 625,
    backgroundColor: 0x337ab7
})

document.getElementById('canvas-cnt').appendChild(app.view)