import React, { Component } from 'react';
import './Controls.css'

class Controls extends Component {
  render() {
    return <div className="controls">
      <TrialsParams trialParams={this.props.trialParams} />
      <GuessPeasControls trialParams={this.props.trialParams}
                         userGuess={this.props.userGuess}
                         handleUserGuess={this.props.handleUserGuess} />
      <RunButton generateData={this.props.generateData}/>
    </div>
  }
}


class TrialsParams extends Component {
  render() {
    return <p>
      <span className='peas-per-trial'>{this.props.trialParams.peasPerTrial}</span>
      ×{this.props.trialParams.numTrials} горошки
    </p>
  }
}

class GuessPeasControls extends Component {
  constructor(props) {
    super(props)
    this.guessNumberInput = this.guessNumberInput.bind(this)
  }

  guessNumberInput(name) {
    return <input type='number' name={name}
                   onChange={this.props.handleUserGuess}
                   min={0} max={this.props.trialParams.peasPerTrial}
                   value={this.props.userGuess[name]}></input>
  }

  render() {
    const slider = <input type='range'
       min={0} max={this.props.trialParams.peasPerTrial}
       value={this.props.userGuess.green} sptep={1}
       onChange={this.props.handleUserGuess}/>
    return <p className="user-guess-controls">
        <span>Підготувати </span>
        <span>{this.guessNumberInput('green')} зелених і </span>
        <span>{this.guessNumberInput('yellow')} жовті шапочки</span>
        {slider}
      </p>
  }
}

class RunButton extends Component {
  render() {
    return <button className="user-guess-controls" onClick={this.props.generateData}>&#9654;</button>
  }
}

export default Controls
