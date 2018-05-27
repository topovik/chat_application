import React, { Component } from 'react'

class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: []
        }

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.currentRoom) {
            let roomId = nextProps.currentRoom.id;
            console.log(nextProps.currentRoom)
            fetch(`http://localhost:6060/api/${roomId}/messages`)
                .then(response => response.json())
                .then(response => this.setState({ messages: response }))

        }

    }


    render() {
        const msg = this.state.messages.map((message, index) => {
            return <p key={index}>{message.text}</p>
        })

        return (
            <section>
                {msg}
            </section>
        )
    }
}

export default Messages