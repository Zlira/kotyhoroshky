import './Results.css'
import React, { Component } from 'react';

class Results extends Component {
  render() {
    const height = 30
    const width = this.props.width
    const successRate = this.props.successRate
    const indicatorX = Math.round(width * successRate)
    const percenSuccess = Math.round(successRate * 100) + '%'
    const successLabel = successRate === 0
      ? null
      : <text y="20" x="0">{':) ' + percenSuccess}</text>
    return <svg className="results" width={width} height={height}>
      <rect x="0" y="0" width={width}
        height={height} className="result-background"/>
      <rect y="0" x={indicatorX}
        width="10" height={height}
        className="resultIndicator"/>
      {successLabel}
    </svg>
  }
}

export default Results
