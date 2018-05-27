import React from 'react';
import App from './App'
import AdminPanel from './components/AdminPanel'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'

const AppIndex = () => {
    return (
        <section>
            <Header />
            <Switch>
                <Route exact path='/' component={App} />
            </Switch>
            <Route path='/adminpanel' component={AdminPanel} />
        </section>
    )
}

export default AppIndex