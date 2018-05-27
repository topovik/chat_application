import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AppIndex from './AppIndex'

render(<BrowserRouter >
            <AppIndex />
       </BrowserRouter >, document.getElementById('root'));
