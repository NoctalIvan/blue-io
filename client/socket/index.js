const socket = new WebSocket("ws://localhost:3003")

socket.onmessage = (event) => {
    // console.log('message got !')
    const data = JSON.parse(event.data)
    if(data.type == "world") {
        window.world = data.data
    }
}

socket.onclose = () => {
    console.log('socket closed')
}

socket.onopen = () => {
    console.log('socket open')
}

// -- actions -- //
const socket_sendNewDirection = ({id, x, y}) => {
    socket.send(JSON.stringify({
        type: 'new_direction',
        data: { id, x, y }
    }))
}

const socket_createBoat = (boat) => {
    socket.send(JSON.stringify({
        type: 'new_boat',
        data: boat
    }))
}