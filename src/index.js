//import react
import React from 'react';
import ReactDOM from 'react-dom';
//after installing react-bootstrap with npm, import the css it created here, then your own.
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
