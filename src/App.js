import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Controls from './Controls'
import Simulation from './Simulation'
import Results from './Results'


class SimulationApp extends Component {
  // todo add a way to use options other then just green/yellow
  constructor(props) {
    super(props)
    const peasPerTrial = 6
    const numTrials = 10
    this.options = ['green', 'yellow']
    this.state = {
      trialParams: {
        numTrials: numTrials,
        peasPerTrial: peasPerTrial,
      },
      userGuess: {
        green: peasPerTrial,
        yellow: 0,
      },
      peaData: Array(numTrials),
    }
    this.handleUserGuess = this.handleUserGuess.bind(this)
    this.generateData = this.generateData.bind(this)
  }

  generateData() {
    let expected, actual
    const data = []
    for (let i=0; i < this.state.trialParams.numTrials; i++) {
      expected = Array(this.state.userGuess.green).fill('green')
                      .concat(Array(this.state.userGuess.yellow).fill('yellow'))
      actual = Array(this.state.trialParams.peasPerTrial).fill(undefined).map(
        (d, i) => Math.random() >= .5? 'green' : 'yellow'
      )
      data.push({
        'expected': expected,
        'actual': actual,
      })
    }
    this.setState({peaData: data})
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
        yellow: parseInt(yellow, 10),
        green: parseInt(green, 10),
      }
    })
  }

  render() {
    return (
      <section className="SimulationApp">
        <Header />
        <Controls trialParams={this.state.trialParams}
                  userGuess={this.state.userGuess}
                  handleUserGuess={this.handleUserGuess}
                  generateData={this.generateData} />
        <Simulation data={this.state.peaData} />
        <Results />
      </section>
    );
  }
}

export default SimulationApp;
