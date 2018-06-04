import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'
import Controls from './Controls'
import Simulation from './Simulation'
import Results from './Results'


class SimulationApp extends Component {
  render() {
    return (
      <section className="SimulationApp">
        <Header />
        <Controls />
        <Simulation />
        <Results />
      </section>
    );
  }
}

export default SimulationApp;
