import React, { Component } from 'react'

class AddMessages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)

    }
    render() {
        return (
            <section>
                <input onChange={this.onChange} value={this.state.text} type="text" />
                <button onClick={this.onClick}>Send</button>
            </section>
        )
    }

    onChange(e) {
        this.setState({ text: e.target.value })
    }

    onClick() {
        const msgObj = {
            text: this.state.text,
            userId: "8618528d-f739-4hsh7-9be2-aa2fa0c9642a",
            roomId: this.props.currentRoom.id
        }

        fetch("http://localhost:6060/api/addmessage", {
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(msgObj)
        })
            .then(response => response.json())
            .then(() => {
                this.props.updateMsg(this.props.currentRoom);
                this.setState({ text: "" });
            })
    }
}

export default AddMessages