import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Controls from './Controls'
import Simulation from './Simulation'
import Results from './Results'
import {getData, sortedDataBySuccess} from './PeaData'


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
    this.sortDataBySuccess = this.sortDataBySuccess.bind(this)
  }

  // todo move all data related functions to a separate class
  generateData() {
    const data = getData(
      ['green', 'yellow'], this.state.trialParams.numTrials,
      this.state.trialParams.peasPerTrial, this.state.userGuess
    )
    const successRate = this.calculateSuccessRate(data)
    this.setState({peaData: data, successRate: successRate})
  }

  // todo maybe calculate success rate for each trial during data generation
  calculateSuccessRate(data) {
    return 1 - data.map((trial) => trial.successRate)
                   .reduce((acc, val) => acc + val)
                   / data.length
  }

  sortDataBySuccess() {
    this.setState({
      peaData: sortedDataBySuccess(this.state.peaData)
    })
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
                  generateData={this.generateData}
                  sortData={this.sortDataBySuccess} />
        <Simulation data={this.state.peaData} />
        <Results width="700" successRate={this.state.successRate}/>
      </section>
    );
  }
}

export default SimulationApp;
