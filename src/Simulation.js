import React, { Component } from 'react';
import './Simulation.css'

function getTrialCooridates(width, height, lineLength, index) {
  const lineNum = Math.floor(index / lineLength)
  return {x: index % lineLength * width, y: lineNum * height}
}

class Simulation extends Component {
  // todo calculate this props dynamically
  render() {
    const trialWidth = 100
    const trialHeight = 55
    const width = 700
    const height = Math.ceil(
      this.props.data.length * trialWidth / width
    ) * trialHeight
    const trials = this.props.data.map(
      (d, i) => <Trial width={trialWidth} height={trialHeight}
                       lineLength={Math.floor(width / trialWidth)}
                       index={i} key={i} data={d}/>
    )
    return (<div>
      <svg width={width} height={height}>
        <rect x="0" y="0" width={width} height={height} className="peaTrials"/>
        {trials}
      </svg>
    </div>)
  }
}

class Trial extends Component {
  render() {
    const coordinates = getTrialCooridates(
      this.props.width, this.props.height,
      // todo this property doesn't look like it belongs here
      this.props.lineLength,
      this.props.index
    )
    return (<g transform={`translate(${coordinates.x}, ${coordinates.y})`}>
      <Peas data={this.props.data.expected} y={0} type="expected"/>
      {/* y attribute should be linked to circle radius */}
      <Peas data={this.props.data.actual} y={19} type="actual"  />
    </g>)
  }
}

class Peas extends Component {
  render() {
    const r = 7
    const paddingTop = 5
    const circles = this.props.data.map(
      (d, i) => <circle cx={(2 * i + 1) * r} cy={this.props.y + r + paddingTop}
                 r={r} key={i}
                 className={`${this.props.type} pea ${d}`}/>
    )
    return (<g transform="translate(5, 0)">
      {circles}
    </g>)
  }
}

export default Simulation
