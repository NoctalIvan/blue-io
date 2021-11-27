const paths = {
    cargo: '/assets/cargo.png',
    target: '/assets/target.png',
    trash: '/assets/trash.png',
}

const textures = {}
for(let key in paths) {
    textures[key] = PIXI.Texture.from(paths[key])
}