import React, { Component } from 'react';
import './components/style/App.css';
import Messages from './components/Messages';
import AddMessages from './components/AddMessages';
import AdminPanel from './components/AdminPanel';

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentRoom: [],
            rooms: []
        }

        this.updateMsg = this.updateMsg.bind(this)
    }

    componentDidMount() {
        fetch('/api')
            .then(response => response.json())
            .then(rooms => this.setState({ rooms }));

    }

    render() {
        const chats = this.state.rooms.map(room => {
            return <p
                key={room.id}
                onClick={() => {
                    this.setState({ currentRoom: room })
                }}>
                {room.name}
            </p>
        }
        )
        return (
            <section>
                <section className="App">
                    <aside>
                        <h2>Chats</h2>
                        {chats}
                    </aside>
                    <section>
                        <Messages currentRoom={this.state.currentRoom} />
                    </section >
                </section>
                <section className="sendMessages">
                    <AddMessages updateMsg={this.updateMsg} currentRoom={this.state.currentRoom} />
                </section>
            </section>
        )
    }

    updateMsg(obj) {
        this.setState({ currentRoom: obj })
    }


}

export default App