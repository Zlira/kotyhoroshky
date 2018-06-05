import React, { Component } from 'react';

class Results extends Component {
  render() {
    const height = 30
    const width = this.props.width
    const indicatorX = Math.round(width * this.props.successRate)
    return <svg width={width} height={height}>
      <rect x="0" y="0" width={width}
        height={height} className="simulationResult"/>
      <rect y="0" x={indicatorX}
        width="10" height={height}
        className="resultIndicator"/>
    </svg>
  }
}

export default Results
