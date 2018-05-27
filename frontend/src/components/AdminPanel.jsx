import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AdminPanel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            uName: "",
            pwd: "",
            adminMode: false
        }

        this.OnChangeUname = this.OnChangeUname.bind(this)
        this.onChangePwd = this.onChangePwd.bind(this)
        this.getToken = this.getToken.bind(this);
        this.logout = this.logout.bind(this)
    }


    guest() {
        return (
            <section>
                <section>
                    <button><Link to="/">Back to main</Link></button>
                </section>
                <form onSubmit={this.getToken}>
                    <input value={this.state.uName} onChange={this.OnChangeUname} type="text" />
                    <input value={this.state.pwd} onChange={this.onChangePwd} type="text" />
                    <button>Start</button>
                </form>
            </section>
        )
    }

    admin() {
        return (
            <section>
                <section>
                    <button><Link to="/">Back to main</Link></button>
                    <button onClick={this.logout}>LogOut</button>
                </section>
                <form action="">
                    <input value={this.state.text} onChange={this.onChangeText} type="text" />
                    <button>Add room</button>
                </form>
            </section>
        )
    }

    OnChangeUname(e) {
        this.setState({ uName: e.target.value })
    }

    onChangePwd(e) {
        this.setState({ pwd: e.target.value })
    }

    onChangeText(e) {
        this.setState({ text: e.target.value })
    }

    logout() {
		delete localStorage.adminToken;
		this.setState({adminMode: true});
	}

    getToken(e) {
        const authObj = {
            name: this.state.uName,
            password: this.state.pwd
        }
        fetch("http://localhost:6060/api/auth", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(authObj)
        })
            .then(response => response.json())
            .then(token => localStorage.adminToken = JSON.stringify(token))
            


    }

    render() {
        const tok = localStorage.adminToken;
        if (this.state.adminMode || tok === undefined) {
            return this.guest()
        }
           return this.admin() 
        }
        
    }



export default AdminPanel