const paths = {
    cargo: '/assets/spb3a.png',
    cargo1: '/assets/spb3b.png',
    cargo2: '/assets/spb3c.png',
    cargo3: '/assets/spb3d.png',
    fregate: '/assets/fregate.png',
    fregate1: '/assets/fregate1.png',
    police: '/assets/police.png',
    target: '/assets/target.png',
    bottle: '/assets/bottle.png',
    trash1: '/assets/trash1.png',
    trash2: '/assets/trash1.png',
    trash3: '/assets/trash1.png',
    // trash2: '/assets/trash2.png',
    // trash3: '/assets/trash3.png',
    cp: '/assets/island3.png',
    background: '/assets/back1.png'
}

const textures = {}
for(let key in paths) {
    textures[key] = PIXI.Texture.from(paths[key])
}

const background = PIXI.Sprite.from(textures.background)
background.alpha = 0.5
app.stage.addChild(background)