let messages = []

const displayMessage = (content, x, y) => {
    let text = new PIXI.Text(content, {
        fontFamily : 'monospace',
        fontSize: 12,
        fill : 0xffffff, 
        align : 'center'
    })
    text.x = x
    text.y = y

    app.stage.addChild(text)
    messages.push({
        since: new Date(),
        origin: {x, y},
        text
    })
}

const updateMessages = () => {
    messages.forEach((message, i) => {
        const dt = new Date() - message.since
        if(dt > 2000) {
            app.stage.removeChild(message.text)
            messages = [...messages.slice(0, i), ...messages.slice(i+1, messages.length)]
            return
        }
        
        message.text.y = message.origin.y - (dt / 400)
        message.text.alpha = ((2000-dt)/2000)
    })
}