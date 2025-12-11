import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import { Provider } from 'react-redux'
import store from './store/store.js'

import './lib/fontawesome.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// import 'lightbox2/dist/css/lightbox.min.css'
// import 'lightbox2/dist/js/lightbox.min.js'

import App from './App.jsx'

import './assets/css/style.css'


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
)
