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
        green: 0,
        yellow: peasPerTrial,
      },
      peaData: Array(numTrials),
      // todo move this to data
      successRate: 0,
    }
    this.handleUserGuess = this.handleUserGuess.bind(this)
    this.generateData = this.generateData.bind(this)
    this.calculateSuccessRate = this.calculateSuccessRate.bind(this)
  }

  // todo move all data related functions to a separate class
  generateData() {
    let expected, actual, successRate
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
    successRate = this.calculateSuccessRate(data)
    this.setState({peaData: data, successRate: successRate})
  }

  // todo maybe calculate success rate for each trial during data generation
  calculateSuccessRate(data) {
    let totSuccessRate = 0, trialSuccessRate, counts
    // todo what if data is initialized?
    const trialLength = data[0].expected.length
    for (let trial of data) {
      counts = {expected: 0, actual: 0}
      // count green peas
      for (let i=0; i < trialLength; i++) {
        // not using state.userGuess because data can be a standalone class
        counts.expected += trial.expected[i] === 'green'? 1: 0
        counts.actual += trial.actual[i] === 'green'? 1: 0
      }
      trialSuccessRate = 1 - (Math.abs(counts.expected - counts.actual) / trialLength)
      totSuccessRate += trialSuccessRate
    }
    return totSuccessRate / data.length
  }

  handleUserGuess(event) {
    const target = event.target
    let green = event.target.value
    let yellow = this.state.trialParams.peasPerTrial - green
    if (target.name === 'yellow') {
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
        <Results width="700" successRate={this.state.successRate}/>
      </section>
    );
  }
}

export default SimulationApp;
