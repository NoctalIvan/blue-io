const UNIQUE_ID = "" + Math.random()

let app = new PIXI.Application({
    width: 1000,
    height: 625,
    backgroundColor: 0x60B7CA
})

document.getElementById('canvas-cnt-close').appendChild(app.view)