import React, { Component } from 'react';
import './Controls.css'

class Controls extends Component {
  render() {
    return <div>
      <TrialsParams trialParams={this.props.trialParams} />
      <GuessPeasControls trialParams={this.props.trialParams}
                         userGuess={this.props.userGuess}
                         handleUserGuess={this.props.handleUserGuess} />
      <RunButton />
    </div>
  }
}


class TrialsParams extends Component {
  render() {
    return <p>
      {this.props.trialParams.numTrials} повторів
       по {this.props.trialParams.peasPerTrial} горошки на раз
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
    return <div>
      <input type='range'
             min={0} max={this.props.trialParams.peasPerTrial}
             value={this.props.userGuess.yellow} sptep={1}
             onChange={this.props.handleUserGuess} />
      <p>
        Щоразу підготувати {}
        {this.guessNumberInput('green')} зелених і {}
        {this.guessNumberInput('yellow')} жовті шапочки
      </p>
    </div>
  }
}

class RunButton extends Component {
  render() {
    return <button>Вперед!</button>
  }
}


export default Controls
