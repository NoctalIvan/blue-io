const paths = {
    cargo: '/assets/b3.jpg',
    fregate: '/assets/b1.jpg',
    police: '/assets/b2.jpg',
    target: '/assets/target.png',
    trash1: '/assets/trash1.png',
    trash2: '/assets/trash2.png',
    trash3: '/assets/trash3.png',
    cp: '/assets/cargo.png',
    background: '/assets/back1.png'
}

const textures = {}
for(let key in paths) {
    textures[key] = PIXI.Texture.from(paths[key])
}

const background = PIXI.Sprite.from(textures.background)
app.stage.addChild(background)