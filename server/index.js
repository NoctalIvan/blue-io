var express = require('express')
var app = express()
require('express-ws')(app)

const engine = require('./engine')
  
app.ws('/', function(ws, req) {
    ws.on('message', function(msgStr) {
        const msg = JSON.parse(msgStr)
        console.log(msg)

        if(!msg || !msg.data || !msg.data.id) {
            return
        }

        if(msg.type == 'new_direction') {
            engine.getWorld().boats[msg.data.id].direction = {
                x: msg.data.x,
                y: msg.data.y
            }

            return
        }

        if(msg.type == 'new_boat') {
            const newX = Math.random() * 1000
            const newY = Math.random() * 625

            engine.getWorld().boats[msg.data.id] = {
                id: msg.data.id,
                name: msg.data.name,
                type: msg.data.type,
                position: {
                    x: newX,
                    y: newY
                },
                direction: {
                    x: newX,
                    y: newY
                },
                speed: 2
            }
        }
    })

    setInterval(() => {
        ws.send(JSON.stringify({
            type: 'world',
            data: engine.getWorld()
        }))
    }, 200)
})
 
const port = process.env.PORT || 3003
app.listen(port, () => {
    console.log('ws listening on port ' + port)
    engine.start()
})
