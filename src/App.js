import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Controls from './Controls'
import Simulation from './Simulation'
import Results from './Results'


class SimulationApp extends Component {
  constructor(props) {
    super(props)
    const peasPerTrial = 6
    this.state = {
      trialParams: {
        numTrials: 10,
        peasPerTrial: peasPerTrial,
      },
      userGuess: {
        green: peasPerTrial,
        yellow: 0,
      },
    }
    this.handleUserGuess = this.handleUserGuess.bind(this)
  }

  handleUserGuess(event) {
    const target = event.target
    let yellow = event.target.value
    let green = this.state.trialParams.peasPerTrial - yellow
    if (target.name === 'green') {
      [yellow, green] = [green, yellow]
    }
    this.setState({
      userGuess: {
        yellow: yellow,
        green: green,
      }
    })
  }

  render() {
    return (
      <section className="SimulationApp">
        <Header />
        <Controls trialParams={this.state.trialParams}
                  userGuess={this.state.userGuess}
                  handleUserGuess={this.handleUserGuess}/>
        <Simulation />
        <Results />
      </section>
    );
  }
}

export default SimulationApp;
