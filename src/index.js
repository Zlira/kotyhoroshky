import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimulationApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SimulationApp />, document.getElementById('root'));
registerServiceWorker();
