import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Controls from './Controls'
import Simulation from './Simulation'
import Results from './Results'
import {getData, sortedDataBySuccess, sortedTrialByMatching} from './PeaData'


class SimulationApp extends Component {
  // todo add a way to use options other then just green/yellow
  constructor(props) {
    super(props)
    const peasPerTrial = props.peasPerTrial || 6
    const numTrials = props.numTrials || 10
    this.options = ['green', 'yellow']
    this.state = {
      // TODO should this be in state if it can be inferred from
      // paeData?
      trialParams: {
        numTrials: numTrials,
        peasPerTrial: peasPerTrial,
      },
      userGuess: {
        green: 0,
        yellow: peasPerTrial,
      },
      peaData: Array(numTrials),
      successRate: 0,
    }
    this.handleUserGuess = this.handleUserGuess.bind(this)
    this.generateData = this.generateData.bind(this)
    this.calculateSuccessRate = this.calculateSuccessRate.bind(this)
    this.sortDataBySuccess = this.sortDataBySuccess.bind(this)
  }

  generateData() {
    const data = getData(
      ['green', 'yellow'], this.state.trialParams.numTrials,
      this.state.trialParams.peasPerTrial, this.state.userGuess
    )
    const successRate = this.calculateSuccessRate(data)
    this.setState({
      peaData: data,
      successRate: 0 // don't show label until sorting ends
    })
    setTimeout(this.sortDataBySuccess, 500)
    setTimeout(() => {
      this.sortDataByMatching
      // update successRate to the actual value
      this.setState((prevState => ({
        successRate: successRate,
        peaData: prevState.peaData.map(sortedTrialByMatching),
      })))
    }, 1500)
  }

  calculateSuccessRate(data) {
    return 1 - data.map((trial) => trial.successRate)
                   .reduce((acc, val) => acc + val)
                   / data.length
  }

  // TODO think of a better name
  sortDataBySuccess() {
    this.setState(prevState => ({
      peaData: sortedDataBySuccess(prevState.peaData)
    }))
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
        <Controls trialParams={this.state.trialParams}
                  userGuess={this.state.userGuess}
                  handleUserGuess={this.handleUserGuess}
                  generateData={this.generateData}/>
        <Simulation data={this.state.peaData} />
        <Results width="700" successRate={this.state.successRate}/>
      </section>
    );
  }
}

class App extends Component {
  render() {
    return  (
    <section className="Chapter1Simulation">
    <Header />
      <SimulationApp peasPerTrial={1} />
      <SimulationApp peasPerTrial={6} />
      <SimulationApp peasPerTrial={10} />
      <SimulationApp peasPerTrial={40} />
    </section>)
  }
}

export default App;
